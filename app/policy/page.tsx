export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">학습 윤리 · 신앙 가이드</h1>
      <p className="text-sm text-neutral-600">주역 텍스트를 지식/문헌 학습 목적으로 탐색하기 위한 안전 가이드입니다.</p>

      <section className="space-y-2">
        <h2 className="font-semibold">핵심 원칙</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>본 서비스는 점술 결과를 단정하거나 예언하지 않습니다.</li>
          <li>신앙·양심·공동체의 분별을 대체하지 않습니다.</li>
          <li>민감 이슈(건강/법률/투자)는 전문 상담 우선 원칙을 지킵니다.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">금지되는 사용 방식</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>운명 단정형 문구(반드시 된다/망한다)</li>
          <li>공포 유도형 해석</li>
          <li>의사결정 책임 전가</li>
        </ul>
      </section>
    </main>
  );
}
