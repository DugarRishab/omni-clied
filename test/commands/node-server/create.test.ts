import {expect, test} from '@oclif/test'

describe('node-server/create', () => {
  test
  .stdout()
  .command(['node-server/create'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['node-server/create', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
