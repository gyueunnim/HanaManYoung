import { Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingSkeleton() {
  return (
    <Stack>
      <Skeleton height="375px" width="90%" className="mx-auto my-3" />
      <Skeleton height="375px" width="90%" className="mx-auto my-3" />
      <Skeleton height="375px" width="90%" className="mx-auto my-3" />
    </Stack>
  );
}
