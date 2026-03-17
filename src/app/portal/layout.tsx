import { PortalLayout } from '@/components/layout/portal-layout';

export default function PortalPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayout>{children}</PortalLayout>;
}
