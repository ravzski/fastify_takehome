import React from "react";

interface ErrorAlertProps {
  message: string | null;
}

export function ErrorAlert({ message }: ErrorAlertProps): JSX.Element | null {
  if (!message) return null;

  return (
    <div className="bg-red-50 p-4 rounded-md">
      <p className="text-red-700">{message}</p>
    </div>
  );
}