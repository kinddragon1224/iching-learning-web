import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비교 | 주역 학습 웹",
  description:
    "주역 학습 웹과 일반 점술 앱의 차이를 목적, 사용 방식, 의사결정 지원 관점에서 비교합니다.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">주역 학습 웹 vs 일반 점술 앱</h1>
        <p className="mt-1 text-sm text-neutral-600">최종 업데이트: 2026-02-25</p>
      </header>

      <p className="text-sm text-neutral-700">
        요약: 주역 학습 웹은 "예언"보다 "성찰과 실행"에 초점을 둡니다. 즉시 해답을 주는 방식보다,
        생각을 정리하고 행동을 설계하는 반복 가능한 학습 루프를 제공합니다.
      </p>

      <section className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left">항목</th>
              <th className="px-4 py-3 text-left">일반 점술 앱</th>
              <th className="px-4 py-3 text-left">주역 학습 웹</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">핵심 목적</td>
              <td className="px-4 py-3">결과/예측 중심 사용</td>
              <td className="px-4 py-3">학습/성찰 중심 사용</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">의사결정 지원</td>
              <td className="px-4 py-3">일반 해석 위주</td>
              <td className="px-4 py-3">4축 질문(돈/일/관계/시간) 기반 실행 점검</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">결과물 형태</td>
              <td className="px-4 py-3">단발성 읽기</td>
              <td className="px-4 py-3">반복 가능한 질문-행동 루프</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">학습 구조</td>
              <td className="px-4 py-3">방법론이 불투명한 경우 많음</td>
              <td className="px-4 py-3">괘 요약 + 6효 포인트 + 성찰 질문 구조화</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
