import { Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center">
      <Spinner size="lg" />
    </div>
  );
}
