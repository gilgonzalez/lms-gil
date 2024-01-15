"use client"

import {

  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface Props {
  children : React.ReactNode,
  onConfirm : () => void,
  actionString : string,
  description : string
}

export const ConfirmModal = ({
  children,
  onConfirm,
  actionString,
  description
} : Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Are you sure to ${actionString}?`}</AlertDialogTitle>
          <AlertDialogDescription className="italic">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  )
}