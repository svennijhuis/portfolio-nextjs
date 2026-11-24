---
title: "My setup: Grok Bot, the T3 Code MCP and Claude Code"
description: "My bots work together in a group chat in Grok Bot, which I call the build room."
date: "2026-11-11"
cover: "/blog/grok-bot-t3-claude/cover.png"
xUrl: "https://x.com/sven_nijhuis/status/2120415848116449481"
tags: ["grok-bot", "t3-code", "claude-code", "agents"]
---

My bots work together in a group chat in Grok Bot, which I call the build room. There they plan the work, start the builds and merge the PRs. The bots don't write code themselves. Every line comes from a Claude Code session on my computer, running Opus 5.5 on my Claude plan. The bots run on a hosted Linux VM with a shell, files and MCP connectors. The T3 Code MCP connects the two: a bot on the VM starts a session (a thread in T3 Code) and reads its result.

Every ticket gets its own session, and every PR gets a second session that reviews it.

The planning runs on Matt Pocock's skills: `/wayfinder`, `/grilling`, `/research`, `/to-spec` and `/to-tickets`. `/statechart` and `/unslop` come from poteto's pstack, and `/deslop` comes from the Cursor team kit. The flow that wires them together is mine.

## The setup

![How a bot on the VM reaches Claude Code on my computer through T3 Connect and the T3 Code MCP.](/blog/grok-bot-t3-claude/setup.jpg)

How a bot on the VM reaches Claude Code on my computer through T3 Connect and the T3 Code MCP.

1. Install T3 Code on my computer and sign in to Claude Code there.
2. Turn on T3 Connect in Settings → Sharing & access. The computer gets an HTTPS address that cloud agents can reach.
3. Add the MCP URL to Grok Bot as a connector.
4. Approve the sign-in with full access, so sessions don't wait on me for every edit.

```plaintext
https://<environment-address>/mcp
```

Full access means a session can change anything on my computer. The review and the merge gate protect main, not the computer, so I only run this on a machine where that risk is acceptable.

## Preparation

Before the build room started work, I wrote down the end goal first: the idea and the technical direction, in one design document. The wayfinder map names it as the source of truth. That gave the bots a source to check, so they could decide on their own. When a question comes up, they read that write-up and do their own research instead of asking me.

## The build room

![The five bots in the build room, their roles and the T3 bot as the only route to code.](/blog/grok-bot-t3-claude/build-room.jpg)

The five bots in the build room, their roles and the T3 bot as the only route to code.

Grok Bot lets me create group chats (called rooms) and put several bots in each one. The build room is the one for this repo, and it only orchestrates: I post what I want and the bots split the work. By default the code, the reviews and the test runs all happen in sessions on my computer.

The Product Owner bot keeps the checklist, picks the next ticket and writes the prompt for its session. At the end it checks the merge gate, gives the GO (the OK to merge) and squash merges, one PR at a time.

The T3 bot is the only bot that talks to T3 Code. Through the T3 Code MCP it starts one new session per job, sends the prompt and reports the result back to the build room. It never merges.

The Strategy bot answers the planning questions in the first planning round, after checking that write-up.

The Reviewer bot and the Tester bot step in only when the Claude plan hits its usage limit. The Reviewer bot then checks the diff against the ticket's acceptance criteria, and the Tester bot runs what CI (GitHub Actions) doesn't cover. Neither of them builds.

The rest of the build room's charter (its written rules):

- Every ticket gets a new session, and so does every review.
- Every prompt sent to a session is written in English.
- One coding harness at a time. When it hits its usage limit, builds wait for the reset and then continue ticket by ticket without asking me.
- The merge gate is a review PASS, a test PASS, green CI, no unresolved threads and the GO. Nobody force pushes, and rebased work goes up as a new branch.
- Bots research planning questions and decide themselves. Only a decision that is hard to undo (architecture, money, accounts and legal) comes to me, and the bots pause the work that depends on it until I answer.
- The stack defaults are written down, and sessions use `/statechart` for flows and `/deslop` on code.
- My latest instruction wins. Before acting, a bot rereads the last messages and never restarts something I just stopped.
- A session is reported as running only after it has started and produces output.
- While waiting, the build room stays silent.
- A blocker only I can clear goes to me once, as one named ask from the Product Owner bot.

## 1. Route

![One message goes from me through Grok Bot and the build room to one session that opens one PR.](/blog/grok-bot-t3-claude/route.jpg)

One message goes from me through Grok Bot and the build room to one session that opens one PR.

I write one message in the build room. The Product Owner bot turns it into a prompt, and the T3 bot starts a fresh session with it.

## 2. Plan with `/wayfinder`

![/wayfinder maps the decisions, then /to-spec and /to-tickets turn them into a backlog.](/blog/grok-bot-t3-claude/plan.jpg)

`/wayfinder` maps the decisions, then `/to-spec` and `/to-tickets` turn them into a backlog.

A big design doesn't fit in one agent session. Hand an agent all of it and it starts building the first part it understands.

`/wayfinder` is Matt Pocock's skill, and its rule is "plan, don't do". You give it a destination. It maps the open decisions between here and there as decision tickets: questions whose answer is a decision, not a slice of the build. Each decision ticket is research, prototype, grilling or task.

A grilling ticket posts numbered questions, each with a recommendation, and then the session stops. In the first planning round, the Strategy bot answered them in the build room and the T3 bot passed the answers into the same session. That bends the skill on purpose: Matt's design has a human answer the grilling, and here a bot answers for me after doing its own research. The Product Owner bot can answer them too. Research tickets run as subagents inside the session. In later planning rounds the session is told to decide after its own research, and no bot answers for it.

`/to-spec` then writes one spec, and `/to-tickets` cuts it into tickets: tracer-bullet vertical slices, each with the tickets that block it. No bot writes the backlog. It all lives as Markdown in the repo, not in GitHub issues, and blocking is a `Blocked by:` line in the file.

The planning artifacts live in the repo next to the code, simplified:

```plaintext
repo/
  docs/wayfinder/
    map.md        destination and open decisions
    issues/       decision tickets
    spec.md       output of /to-spec
    pbis/         tickets from /to-tickets
    research/     notes from research tickets
    statechart/   the TLA+ model
  src/            the code the sessions build
```

A ticket file, simplified:

```markdown
# Feature: one small user-facing slice

**Blocked by:** Repo tooling and CI

## Goal
One feature works end to end: the API accepts the request, the data is stored and the user sees the result.

## Acceptance criteria (definition of done)
- [ ] The main path works end to end
- [ ] Invalid input is rejected with a clear error
- [ ] Each criterion is proven by a test
- [ ] Local checks and CI green

## Evidence on the PR
- Test output
- CI link
```

The sizing rule is one review round and about 400 hand-written lines.

## 3. Model the state with `/statechart`

![A simplified state diagram of the job model that TLC checks.](/blog/grok-bot-t3-claude/statechart.jpg)

A simplified state diagram of the job model that TLC checks.

Once a flow has states, it can look right on paper and still leave a job stuck. `/statechart`, from pstack, turns the design into a TLA+ model, checks every reachable state with TLC and draws the result as a statechart.

- Every decision from the plan becomes an action in the model.
- Every promise becomes a rule, written as one sentence.
- TLC walks every reachable state and checks every rule.
- The skill writes a report and a chart into the repo.

The model states the rules in plain terms, such as "a cancelled job never leaves a result behind" and "a job runs on one worker at a time". TLC walked every reachable state, and every rule held.

That result came after the planning, not before it. On the first check, the design as written left gaps: TLC found paths where a job could fail and end with no next step. Each gap went back to the plan as a decision ticket, and the model passed only after those decisions were made, before any code existed.

The full model is too big to draw, so a smaller run draws the core states. When a ticket touches state, the model changes first, and TLC has to pass before any code is written.

## 4. Build, one ticket per session

![One build session per ticket, with the model updated first when state changes.](/blog/grok-bot-t3-claude/build.jpg)

One build session per ticket, with the model updated first when state changes.

A long session that builds ticket after ticket drifts. So every ticket gets a new session. It writes the code and the tests, opens one PR and never merges.

This also keeps the token use small. A fresh session starts with only the ticket and the repo, not the history of earlier tickets. The build room reads the session's report, not its transcript, so its own context stays small. Independent tickets, with no blocking edge between them, run as parallel sessions, and merges stay one at a time.

Two cleanup skills run before the push. `/deslop`, from the Cursor team kit, strips AI slop from the code: extra comments, casts to `any`, needless `try/catch`. Model-written code carries habits a human reviewer would reject, and cleaning them first keeps the review about logic. `/unslop`, from pstack, does the same for docs and PR bodies. People read those, and AI tells make readers skim or distrust them.

## 5. Review in its own session

![A read-only review session gives PASS or FAIL, and a FAIL loops back for a fix.](/blog/grok-bot-t3-claude/review.jpg)

A read-only review session gives PASS or FAIL, and a FAIL loops back for a fix.

For every PR, the T3 bot starts a second, read-only session. It never saw the build, so it reads the diff, the ticket and the chart fresh. Its first line is PASS or FAIL. A FAIL comes with a numbered fix list and goes back to the build session, at most 2 rounds. The review checks:

- The PR is up to date with main, CI is green on that exact head and no review threads are unresolved
- The local checks pass
- The ticket's acceptance criteria and their tests
- The statechart transitions the ticket touches
- That `/deslop` and `/unslop` ran
- What CI doesn't cover: a live health check and a check for leaked secrets

A PASS names the commit it reviewed and counts only for that commit.

## 6. Ship

![The five checks of the merge gate, then one squash merge at a time.](/blog/grok-bot-t3-claude/ship.jpg)

The five checks of the merge gate, then one squash merge at a time.

A PR merges only when it passes the merge gate, and the Product Owner bot squash merges one PR at a time. My standing instruction to the build room is short: "Just merge when it's OK, you don't need my help." Then the next ticket starts in a new session.

## The skills

![Each skill, who made it and the step where it runs.](/blog/grok-bot-t3-claude/skills.png)

Each skill, who made it and the step where it runs.

Each skill, what it does and where it runs in the flow:

- `/wayfinder` (Matt Pocock): plans work that is too big for one session as a map of decision tickets, then resolves them one by one. Runs in the planning session.
- `/grilling` (Matt Pocock): asks numbered questions, each with a recommended answer, and waits for the answers. Runs on grilling tickets during planning.
- `/research` (Matt Pocock): looks up facts in primary sources and writes the findings to the repo. Runs on research tickets during planning.
- `/to-spec` (Matt Pocock): turns the settled decisions into one spec. Runs at the end of planning.
- `/to-tickets` (Matt Pocock): cuts the spec into vertical-slice tickets, each with the tickets that block it. Runs right after `/to-spec`.
- `/statechart` (poteto, pstack): checks a TLA+ model of the system's states with TLC and draws it as a statechart. Runs after planning, and again before a ticket that changes state.
- `/deslop` (Cursor team kit): strips AI slop from the code. Runs in the build session before the push.
- `/unslop` (poteto, pstack): cuts AI tells from docs and PR bodies. Runs in the build session before the push.

## The flow in practice

![The whole loop: bots in the build room decide, and Claude Code sessions do the work.](/blog/grok-bot-t3-claude/flow.jpg)

The whole loop: bots in the build room decide, and Claude Code sessions do the work.

### Example 1: the first planning round

My message to the build room:

> Make the first tickets through T3 Code. Use wayfinder there and answer its questions yourselves, then run `/to-spec` and `/to-tickets`.

Path: the build room → the T3 bot → T3 Code MCP → planning session → back to the build room.

There was no ticket yet, so the T3 bot turned that message into a planning prompt and started a fresh session through the T3 Code MCP. The session asked grilling questions, the Strategy bot answered them in the build room and the T3 bot sent the answers back into the same session. The session finished the plan and reported back. The plan landed on main as the first PR.

### Example 2: building one ticket

Path: the Product Owner bot → the T3 bot → T3 Code MCP → build session → back to the build room.

The Product Owner bot picked the next unblocked ticket and wrote a short prompt: build this ticket with tests, clean it up and open one PR. The T3 bot started a fresh session with that prompt through the T3 Code MCP. The session built the ticket, opened the PR and reported back. The T3 bot posted the result in the build room, and the PR went on to review.

### Example 3: a review, then the merge

Path: the T3 bot → T3 Code MCP → review session → verdict → the build room → the Product Owner bot.

The T3 bot started a fresh, read-only review session through the T3 Code MCP. The session returned a PASS, the T3 bot relayed it to the build room and the Product Owner bot checked the merge gate and squash merged the PR.

When two independent tickets finish together, merges still go one at a time. After the first merge, the second PR is brought up to date with the new main, reviewed again and then merged.

## The result

![27 PRs opened and 18 merged in 24 hours.](/blog/grok-bot-t3-claude/result.jpg)

27 PRs opened and 18 merged in 24 hours.

27 PRs opened. 18 squash merged into main, one at a time, in 24 hours: 12 features, 2 chores and 4 docs. That is wall-clock time, with several sessions running in parallel. 13 of those merges built a ticket or a slice of one, out of a plan of 63 tickets.

## Closing

The build room decides, a fresh session builds, another one checks and one bot merges.

## Further reading

- [Matt Pocock's skills](https://github.com/mattpocock/skills): [/wayfinder](https://github.com/mattpocock/skills/tree/main/skills/engineering/wayfinder), [/grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling), [/research](https://github.com/mattpocock/skills/tree/main/skills/engineering/research), [/to-spec](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec) and [/to-tickets](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets)
- [pstack](https://github.com/cursor/plugins/tree/main/pstack): poteto's skills, including [/statechart](https://github.com/cursor/plugins/tree/main/pstack/skills/statechart) and [/unslop](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop)
- pstack, [part 1](https://x.com/poteto/status/2094457600259842065) and [part 2](https://x.com/poteto/status/2097732320606507506): poteto's articles on the stack
- [Cursor team kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit): the plugin that ships [/deslop](https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/deslop)
- [T3 Code](https://t3.codes/) and [its source](https://github.com/pingdotgg/t3code)
- [Outside agents](https://github.com/pingdotgg/t3code/blob/main/docs/user/outside-agents.md): how a cloud agent reaches T3 Code
- [Claude Code docs](https://code.claude.com/docs/en/overview): the harness the sessions run in
- Find me on [X](https://x.com/sven_nijhuis), [LinkedIn](https://www.linkedin.com/in/sven-nijhuis/) and [my website](https://svennijhuis.io/).
