export const controlStyleClasses = `
  border px-2
  border-gray-300 rounded-sm
  [&:hover:not(:where(:disabled,:has(:disabled)))]:bg-gray-50
  [&:is(:focus-visible,:has(:focus-visible))]:bg-gray-50 [&:is(:focus-visible,:has(:focus-visible))]:outline-none [&:is(:focus-visible,:has(:focus-visible))]:ring-2 [&:is(:focus-visible,:has(:focus-visible))]:ring-gray-300
  [&:is(:active,:has(:active))]:bg-gray-200
  [&:is(:disabled,:has(:disabled))]:text-gray-400 [&:is(:disabled,:has(:disabled))]:bg-gray-200 [&:is(:disabled,:has(:disabled))]:cursor-default
`;
