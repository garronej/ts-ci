
# github_actions_toolkit

```bash
npm install
npm run build
```

Example use:  
```yaml
  trigger-deploy:
    runs-on: ubuntu-latest
    if: steps.id1.outputs.is_version_changed && github.event_name == 'push'
    needs:
      - test-node
      - test-deno
    steps:
      - name: Check if package.json version have changed
        id: id1
        uses: garronej/github_actions_toolkit@master
        with: 
          action_name: is_version_changed
          owner: ${{github.repository_owner}}
          repo: ${{github.repository.name}}
          branch_current: ${{master}}
          branch_new: ${{dev}}
      - name: Trigger publish if version changed
        uses: garronej/github_actions_toolkit@master
        with:
          action_name: dispatch_event
          owner: ${{github.repository_owner}}
          repo: ${{github.repository.name}}
          event_type: publish
```

