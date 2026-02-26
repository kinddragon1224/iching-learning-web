# Checkout Webhook 연동

정적 배포(`output: export`) 특성상 서버 API Route를 사용할 수 없어,
체크아웃 신청 데이터는 **클라이언트에서 Webhook URL로 직접 POST**하도록 구성되어 있습니다.

## 1) 환경변수 설정

`.env.local` (또는 배포 환경변수)에 아래 값을 추가하세요.

```bash
NEXT_PUBLIC_CHECKOUT_WEBHOOK_URL="https://your-webhook-endpoint"
```

> `NEXT_PUBLIC_*` 값은 브라우저에 노출됩니다. 따라서 **비밀키를 URL에 직접 넣지 말고**,
> 인증이 필요하면 Webhook 서버에서 IP/Origin 검증 또는 별도 서명 검증을 사용하세요.

## 2) 전송 payload

```json
{
  "plan": "solo | team | enterprise",
  "planTitle": "Solo Practitioner",
  "email": "you@example.com",
  "requestId": "IC-260226-1234",
  "createdAt": "2026-02-26T04:40:00.000Z"
}
```

## 3) 동작 방식

1. `/checkout`에서 신청 클릭
2. Webhook URL이 있으면 POST 전송 시도
3. 성공/실패 상태를 `sessionStorage`에 함께 저장
4. `/checkout/success`에서 연동 상태를 사용자에게 표시

## 4) Notion/Google Sheets 연결 팁

- 권장: n8n / Make / Pipedream으로 Webhook 받기
- 받은 데이터를 Notion DB 또는 Google Sheets 행으로 삽입
- 실패 시 Slack/Discord 알림 분기 추가
