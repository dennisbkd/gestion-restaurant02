import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonPerfil = () => {
  return (
    <div className="flex container mx-auto min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Card Skeletons */}
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 animate-pulse"
              style={{ animation: 'pulse-breath 2s infinite' }}
            >
              <div className="mb-4">
                <div className="h-6 w-40 mb-2 bg-gray-200 rounded breath" />
                <div className="h-4 w-64 bg-gray-200 rounded breath" />
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 breath" />
                <div className="flex-1 space-y-3 w-full">
                  <div className="h-5 w-32 bg-gray-200 rounded breath" />
                  <div className="h-4 w-56 bg-gray-200 rounded breath" />
                  <div className="h-4 w-full bg-gray-200 rounded breath" />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-24 rounded bg-gray-200 breath" />
                ))}
              </div>
              <div className="flex justify-end border-t mt-6 pt-4">
                <div className="h-10 w-32 rounded bg-gray-200 breath" />
              </div>
            </div>
          ))}

          {/* List Skeleton */}
          <div
            className="bg-white rounded-lg shadow p-6 animate-pulse"
            style={{ animation: 'pulse-breath 2s infinite' }}
          >
            <div className="mb-4">
              <div className="h-6 w-32 mb-2 bg-gray-200 rounded breath" />
              <div className="h-4 w-48 bg-gray-200 rounded breath" />
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <div className="h-4 w-24 mb-2 bg-gray-200 rounded breath" />
                    <div className="h-3 w-40 bg-gray-200 rounded breath" />
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded breath" />
                    <div className="h-6 w-20 rounded bg-gray-200 breath" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center border-t mt-6 pt-4">
              <div className="h-10 w-40 rounded bg-gray-200 breath" />
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
          @keyframes pulse-breath {
            0% { opacity: 0.7; transform: scale(1);}
            50% { opacity: 1; transform: scale(1.03);}
            100% { opacity: 0.7; transform: scale(1);}
          }
          .breath {
            animation: pulse-breath 2s infinite;
          }
        `}
      </style>
    </div>
  )
}
