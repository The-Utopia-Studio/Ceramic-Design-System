import * as React from 'react'
import { Badge, type BadgeProps } from './Badge'
import { cn } from '../lib/utils'

export function ToolConnectorBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('uds-tool-connector-block', className)} {...props} />
}

export interface ToolConnectorSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function ToolConnectorSection({
  children,
  className,
  description,
  title,
  ...props
}: ToolConnectorSectionProps) {
  return (
    <div className={cn('uds-tool-connector-section', className)} {...props}>
      <div className="uds-tool-connector-section__heading">
        <div aria-level={3} className="uds-tool-connector-section__title" role="heading">
          {title}
        </div>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </div>
  )
}

export function ToolConnectorList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-tool-connector-list', className)} role="list" {...props} />
}

export interface ToolConnectorItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  actionLabel: string
  description: string
  detail?: React.ReactNode
  disabled?: boolean
  expanded?: boolean
  icon?: React.ReactNode
  onAction?: () => void
  status?: string
  statusVariant?: BadgeProps['variant']
  title: string
}

export function ToolConnectorItem({
  actionLabel,
  className,
  description,
  detail,
  disabled = false,
  expanded = false,
  icon,
  onAction,
  status,
  statusVariant = 'outline',
  title,
  ...props
}: ToolConnectorItemProps) {
  return (
    <div
      className={cn('uds-tool-connector-item', className)}
      data-expanded={expanded ? 'true' : undefined}
      role="listitem"
      {...props}
    >
      <button
        aria-expanded={detail === undefined ? undefined : expanded}
        className="uds-tool-connector-item__trigger"
        disabled={disabled}
        onClick={onAction}
        type="button"
      >
        <span className="uds-tool-connector-item__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="uds-tool-connector-item__copy">
          <span className="uds-tool-connector-item__title">{title}</span>
          <span className="uds-tool-connector-item__description">{description}</span>
        </span>
        {status ? (
          <Badge className="uds-tool-connector-item__status" size="sm" variant={statusVariant}>
            {status}
          </Badge>
        ) : null}
        <span className="uds-tool-connector-item__action">{actionLabel}</span>
      </button>
      {expanded && detail ? (
        <div className="uds-tool-connector-item__detail">{detail}</div>
      ) : null}
    </div>
  )
}
