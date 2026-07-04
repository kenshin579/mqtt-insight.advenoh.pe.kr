import { ko } from '@/lib/i18n/ko';
import { Landing } from '@/components/landing';
import { SetHtmlLang } from '@/components/set-html-lang';

export default function Page() {
  return (
    <>
      <SetHtmlLang lang="ko" />
      <Landing t={ko} lang="ko" />
    </>
  );
}
