import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'

const channels = [
  {
    key: 'email',
    value: 'berthosefin@gmail.com',
    href: 'mailto:berthosefin@gmail.com'
  },
  {
    key: 'linkedin',
    value: 'linkedin.com/in/berthose-fin-randrianantenaina-7874b713b',
    href: 'https://www.linkedin.com/in/berthose-fin-randrianantenaina-7874b713b/'
  },
  {
    key: 'whatsapp',
    value: '+261 34 06 062 65',
    href: 'https://wa.me/261340606265'
  }
]

export default function ContactPage() {
  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>Contact</h1>
        <PromptLine command='cat ~/contact.txt' className='mb-8' />
        <Pane label='~/contact.txt' contentClassName='p-0'>
          <ul>
            {channels.map(channel => (
              <li key={channel.key}>
                <a
                  href={channel.href}
                  {...(channel.href.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className='group flex items-baseline gap-4 px-4 py-3 transition-colors hover:bg-accent'
                >
                  <span className='w-20 shrink-0 text-xs uppercase tracking-wider text-muted-foreground'>
                    {channel.key}
                  </span>
                  <span className='truncate text-sm text-foreground underline-offset-4 group-hover:text-brand group-hover:underline'>
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Pane>
      </div>
    </section>
  )
}
