export const getJoinedOn = (date: string, returnType: string = "string") => {
  const joinedOn = new Date(date);
  if (returnType === "string")
    return (
      joinedOn.getDay() +
      " " +
      joinedOn.getDate() +
      "," +
      joinedOn.getFullYear()
    );
  return [
    joinedOn.getDate(),
    joinedOn.getMonth(),
    joinedOn.getFullYear(),
    joinedOn.getDay(),
  ];
};
