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