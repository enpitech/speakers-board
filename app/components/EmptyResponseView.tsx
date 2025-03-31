export const EmptyResponseView = ({ message }: { message: string }) => {
  return (
    <div className="text-center py-8 text-[#939393] font-bold bg-secondary p-4 rounded-lg">
      <div className="text-4xl">404</div>
      <div className="text-2xl">{message}</div>
    </div>
  );
};
