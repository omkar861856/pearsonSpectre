import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Define local storage cache helpers for static content
const cacheGet = (key: string): any => {
  try {
    const cachedData = localStorage.getItem(`ps_cache_${key}`);
    if (!cachedData) return null;
    
    const { data, expiry } = JSON.parse(cachedData);
    if (expiry < Date.now()) {
      localStorage.removeItem(`ps_cache_${key}`);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error('Cache read error:', err);
    return null;
  }
};

const cacheSet = (key: string, data: any, ttlMinutes = 60) => {
  try {
    const cacheData = {
      data,
      expiry: Date.now() + (ttlMinutes * 60 * 1000)
    };
    localStorage.setItem(`ps_cache_${key}`, JSON.stringify(cacheData));
  } catch (err) {
    console.error('Cache write error:', err);
  }
};

// Enhanced query function with caching
export const getEnhancedQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // Check if this is static content that can be cached
    const cacheKeyStr = Array.isArray(queryKey) ? queryKey.join('_') : queryKey.toString();
    const isStaticContent = url.includes('/testimonials') || 
                            url.includes('/victories') || 
                            url.includes('/practice-areas');
    
    // Try to get from cache first if it's static content
    if (isStaticContent) {
      const cachedData = cacheGet(cacheKeyStr);
      if (cachedData) return cachedData;
    }
    
    // If not in cache or not static, fetch from server
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    const data = await res.json();
    
    // Cache static content
    if (isStaticContent) {
      cacheSet(cacheKeyStr, data);
    }
    
    return data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getEnhancedQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes instead of Infinity - better for dev testing
      gcTime: 1000 * 60 * 60, // 1 hour - using gcTime as cacheTime is deprecated
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
