---
type: Essay
title: Why this exists, and what it could change
description: Make software commitments visible when code, names and responsibility travel separately.
---
# Why this exists, and what it could change

Software gets copied, rebuilt, adapted and included in other products. The people who made the original may not have reviewed those versions or agreed to maintain them. Using the same code does not mean having the same commitments behind it.

## Why this site exists

When you receive a piece of software, you may recognize its name without knowing who stands behind the release in your hands. Who reviewed it? Who intends to maintain it? What does that maintenance cover? When should you reconsider relying on it?

Those questions are often answered through assumptions. A familiar name becomes a substitute for a commitment. A successful build is mistaken for approval. A notice preserved in a fork is read as continuing support from the original team.

AUTHORITY.md proposes making those relationships explicit. Someone states what they stand behind and its limits. The person using the software decides what to rely on. Neither side has to infer the other's position from a name, a logo or the mere availability of code.

This site exists to explain that idea, test it against ordinary situations and develop a declaration people can discuss and use as a shared reference.

## Why agents make the question more pressing

As coding agents make software easier to produce and adapt, code production becomes more like a commodity. Features become easier to reproduce, putting pressure on software vendors whose value rests mainly on the code they supply. Sustaining that software over time becomes a more important part of what they offer.

Maintenance requires continuing effort: investigating failures, addressing vulnerabilities, testing changes, preserving compatibility and supporting versions that people still use. Agents can assist with that work. Someone must still organize it, fund it and remain responsible for following through.

That continuity matters especially for critical components. Consider an authentication library embedded in production services. The teams relying on it may need fixes for an older release, careful review of security changes and a migration path when support ends. Those needs can persist for years after the initial code was written.

An authority declaration makes the undertaking explicit: who commits to maintaining which artifacts, what the work covers and for how long. A vendor or maintainer can make sustained effort a visible part of its offer. Consumers can evaluate that commitment, the evidence that it can be fulfilled and whether it meets their needs.

## What this can change

| Today, a consumer may have to assume… | An explicit relationship would let them ask… |
| --- | --- |
| “It has the project's name, so the project must support it.” | “Who stands behind this particular release?” |
| “They made it, so they must maintain it.” | “What maintenance have they actually undertaken, and for how long?” |
| “The fork kept the notices, so the old promises still apply.” | “What does the new maintainer commit to independently?” |
| “It passed a check, so we can trust the whole product.” | “What was checked, what did the check establish, and what remains our decision?” |
| “We accepted it once, so nothing needs reconsidering.” | “Which changes or deadlines should cause us to review that decision?” |

For **publishers**, this makes it easier to state a useful, bounded commitment without appearing to promise everything. Producing a release, reviewing it and maintaining it can remain distinct responsibilities.

For **consumers**, it makes choices easier to explain. A research team may accept a release's origin and maintain its own copy. A service operator may need a maintenance commitment as well. Their different decisions need not imply disagreement about the software itself.

For **maintainers, auditors and downstream teams**, it makes their contributions visible in their own right. A fork can earn reliance through its own commitments. An independent examination can matter without pretending to speak for the original publisher.

## A different way to describe a release

Instead of leaving users to infer “this is official, therefore someone will look after it,” a publisher could say:

> We produced this release. We reviewed these parts. We undertake these maintenance activities until this date. Here is the evidence and here are the limits.

A consumer could then say:

> We rely on these statements for this use. We do not rely on the others. These are the reasons, and these are the circumstances in which we will reconsider.

The benefit is a relationship that can be inspected, questioned and revised. It is not a universal trust score or a promise that all software becomes safe.

## What would count as progress

A reader should be able to name the party making a commitment, explain its scope and limits, and distinguish those commitments from their own reasons for accepting the software.

The proposal succeeds only if that clarity improves real publishing and use decisions. The declaration is still a draft; publishing a statement does not by itself make it true or ensure that a promise will be kept.

Continue with [how authority works](understanding-authority.md), or [apply the questions to your own software](use-it.md).
