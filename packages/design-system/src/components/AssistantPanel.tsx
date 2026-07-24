import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export interface AssistantPanelProps extends React.HTMLAttributes<HTMLElement> {
  body?: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
}

export function AssistantPanel({
  body,
  children,
  className,
  footer,
  header,
  ...props
}: AssistantPanelProps) {
  return (
    <aside className={cn('uds-assistant-panel', className)} {...props}>
      {header}
      {body ?? children}
      {footer}
    </aside>
  )
}

export function AssistantPanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn('uds-assistant-panel-header', className)} {...props} />
}

export function AssistantPanelHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-assistant-panel-heading', className)} {...props} />
}

export function AssistantPanelTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-level={2}
      className={cn('uds-assistant-panel-title', className)}
      role="heading"
      {...props}
    />
  )
}

export function AssistantPanelDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-assistant-panel-description', className)} {...props} />
}

export function AssistantPanelActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-assistant-panel-actions', className)} {...props} />
}

export interface AssistantPanelCloseProps
  extends Omit<ButtonProps, 'aria-label' | 'children' | 'isIconOnly'> {
  label: string
}

export function AssistantPanelClose({
  className,
  label,
  size = 'sm',
  variant = 'ghost',
  ...props
}: AssistantPanelCloseProps) {
  return (
    <Button
      aria-label={label}
      className={cn('uds-assistant-panel-close', className)}
      isIconOnly
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      <X aria-hidden="true" />
    </Button>
  )
}

export function AssistantPanelBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-assistant-panel-body', className)} {...props} />
}

export interface AssistantPanelEmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: React.ReactNode
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function AssistantPanelEmptyState({
  children,
  className,
  description,
  icon,
  title,
  ...props
}: AssistantPanelEmptyStateProps) {
  return (
    <div className={cn('uds-assistant-panel-empty', className)} {...props}>
      {icon ? <div className="uds-assistant-panel-empty-icon">{icon}</div> : null}
      {title ? <div className="uds-assistant-panel-empty-title">{title}</div> : null}
      {description ? (
        <div className="uds-assistant-panel-empty-description">{description}</div>
      ) : null}
      {children}
    </div>
  )
}

export function AssistantPanelFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn('uds-assistant-panel-footer', className)} {...props} />
}
