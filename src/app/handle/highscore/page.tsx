'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase, HighScore } from '@/lib/supabase';

export default function HighScorePage() {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHighScores();
  }, []);

  const loadHighScores = async () => {
    try {
      const { data, error } = await supabase
        .from('highscores')
        .select('*')
        .order('score', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error loading highscores:', error);
      } else {
        setHighScores(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link
          href="/handle"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
        >
          ←
        </Link>
      </div>

      <div className="max-w-2xl w-full mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-2">
            명예의 전당
          </h1>
          <p className="text-gray-500 text-sm">
            상위 100위
          </p>
        </motion.div>

        {/* High Score List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">불러오는 중...</p>
            </div>
          ) : highScores.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">아직 등록된 기록이 없습니다</p>
              <Link
                href="/handle"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                게임하러 가기 →
              </Link>
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-100/50 px-6 py-3 grid grid-cols-12 gap-4 text-sm text-gray-600">
                <div className="col-span-2 text-center">순위</div>
                <div className="col-span-5">이름</div>
                <div className="col-span-3 text-center">연승</div>
                <div className="col-span-2 text-center text-xs md:text-sm">날짜</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {highScores.map((score, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.01 }}
                    className="px-6 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Rank */}
                    <div className="col-span-2 text-center">
                      {index === 0 && <span className="text-xl">🥇</span>}
                      {index === 1 && <span className="text-xl">🥈</span>}
                      {index === 2 && <span className="text-xl">🥉</span>}
                      {index >= 3 && <span className="text-gray-500 text-sm">{index + 1}</span>}
                    </div>

                    {/* Name */}
                    <div className="col-span-5 text-gray-900 truncate">
                      {score.name}
                    </div>

                    {/* Score */}
                    <div className="col-span-3 text-center">
                      <span className="inline-flex items-center gap-1 text-gray-700 text-sm">
                        🔥 {score.score}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-center text-xs text-gray-400">
                      {new Date(score.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link
            href="/handle"
            className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm"
          >
            ← 게임으로 돌아가기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
