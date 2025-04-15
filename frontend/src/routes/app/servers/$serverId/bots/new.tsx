import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/servers/$serverId/bots/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/servers/bots/new"!</div>
}
