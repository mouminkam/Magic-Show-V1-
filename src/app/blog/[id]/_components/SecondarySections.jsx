import { Suspense } from "react";
import dynamic from "next/dynamic";
import SectionSkeleton from "../../../../components/ui/SectionSkeleton";
import SectionBoundary from "../../../../components/ui/SectionBoundary";

const CommentsSection = dynamic(() => import("./CommentsSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

export default async function SecondarySections({ promises, postId }) {
  const comments = await promises.comments;

  return (
    <SectionBoundary>
      <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
        <CommentsSection comments={comments ?? []} postId={postId} />
      </Suspense>
    </SectionBoundary>
  );
}
