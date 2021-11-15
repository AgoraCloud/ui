# October 1st 2021

# September 30th 2021
- [x] first stable version with CreateDeployment and Workspaces page mostly done
- [x] fixed validation errors with the `getErrors(validator)` function
- [x] got the inputs to work properly

# September 19th 2021
- [x] changed build tool from webpack to vite
- [x] added outline for new modelling system (@mars-man/models integration)
# September 21st 2021
- [x] continued model creation, flushed out `WorkspacesModel` and `WorkspaceModel`
- [x] added PROXY_TARGET and fixed cookieDomainRewrite to build tool
# September 22nd 2021
- [x] went through every file and made note of changes that need to be made
- [x] created a priority list for the refactoring
- [x] created an outline proposal
# September 23rd 2021
- [x] refactored all the Inputs to work with the new `FormModel`
    - [x] workspace select
    - [x] ImageSelect
- [x] tried and failed to remove `autocomplete`
- [x] refactored side bar / menu
- [x] refactored top bar
# September 24th 2021
- [ ] reworking Events
    - [x] change data structure
    - [x] implement events into @mars-man/models Repo
    - [ ] implement events in CreateDeployment repo
- [ ] get CreateDeployment repo to work
    - [ ] figure out why the validator is failing
    - [ ] insure proper data structure (referring to swagger)
    - [ ] provide it a payload / form
    - [ ] see if body works as expected with @mars-man/models


# October 4th 2021
## Decide how to pass repo to a Form
### 1. pass it to the form view
**pros**
- reduces coupling between form view/model and repo.
**cons**
- the issue with this is that the form is then responsibile for passing the data

```jsx
<Form form={form} repo={repo}>
    ...
</Form>
```

### 2. pass it to the form model
**pros** 
- cleanest way of doing this
**cons**
- would require figuring out how to pass data to a repo
    - perhaps the `call()` function could be `call(data: any)`
```ts
this.form = new FormModel({
    submit: this.repos.submit 
})
```


# Thoughts
- we are loading children wrong, currently they don't get loaded at the same time as the parent. i.e. workspace doesn't wait for deployments to load.
    - this will require us to change children to enable it to work without a key / section of the parent's data