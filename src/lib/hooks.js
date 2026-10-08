// src/lib/hooks.js
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

/**
 * Generic hook to fetch data from Supabase.
 * 
 * Usage:
 *   const { data, loading, error } = useSupabaseQuery('education', {
 *     order: { column: 'display_order', ascending: true }
 *   })
 */
export const useSupabaseQuery = (table, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    select = '*',
    order,
    eq,
    single = false,
  } = options

  // Build a stable key so we don't re-fetch on every render
  const key = JSON.stringify({ table, select, order, eq, single })

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      try {
        setLoading(true)
        let query = supabase.from(table).select(select)

        if (eq) query = query.eq(eq.column, eq.value)
        if (order) {
          query = query.order(order.column, {
            ascending: order.ascending ?? true,
          })
        }
        if (single) query = query.single()

        const { data, error } = await query

        if (error) throw error
        if (!cancelled) setData(data)
      } catch (err) {
        console.error(`[useSupabaseQuery:${table}]`, err)
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return { data, loading, error }
}

/**
 * Fetch the singleton profile row (id=1).
 */
export const useProfile = () =>
  useSupabaseQuery('profile', {
    order: { column: 'id', ascending: true },
    single: true,
  })

/**
 * Fetch ordered education entries.
 */
export const useEducation = () =>
  useSupabaseQuery('education', {
    order: { column: 'display_order', ascending: true },
  })

/**
 * Fetch ordered skills.
 */
export const useSkills = () =>
  useSupabaseQuery('skills', {
    order: { column: 'display_order', ascending: true },
  })

/**
 * Fetch ordered work experience.
 */
export const useExperience = () =>
  useSupabaseQuery('experience', {
    order: { column: 'display_order', ascending: true },
  })

/**
 * Fetch the ordered project grid list.
 */
export const useProjects = () =>
  useSupabaseQuery('projects', {
    order: { column: 'display_order', ascending: true },
  })

/**
 * Fetch one project's details by slug.
 */
export const useProjectDetail = (slug) =>
  useSupabaseQuery('project_details', {
    eq: { column: 'project_slug', value: slug },
    single: true,
  })

/**
 * Fetch all certifications.
 */
export const useAchievements = () =>
  useSupabaseQuery('achievements', {
    order: { column: 'display_order', ascending: true },
  })

/**
 * Fetch TryHackMe stats (singleton).
 */
export const useThmStats = () =>
  useSupabaseQuery('thm_stats', {
    order: { column: 'id', ascending: true },
    single: true,
  })

/**
 * Fetch all TryHackMe badges.
 */
export const useThmBadges = () =>
  useSupabaseQuery('thm_badges', {
    order: { column: 'display_order', ascending: true },
  })

  /**
 * Fetch all admin-uploaded files.
 */
export const useAdminFiles = () =>
  useSupabaseQuery('admin_files', {
    order: { column: 'uploaded_at', ascending: false },
  })

  /**
 * Fetch all page views (raw). Client-side aggregation happens in the component.
 */
export const usePageViews = () =>
  useSupabaseQuery('page_views', {
    order: { column: 'visited_at', ascending: false },
  })