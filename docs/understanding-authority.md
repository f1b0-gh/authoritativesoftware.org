---
type: Explanation
title: Authority is asserted; reliance is chosen
description: Separate what an operator says, what verification finds and what a consumer accepts.
---
# Authority is asserted; reliance is chosen

An operator declares what it claims about particular software. A consumer independently decides whether to rely on those claims. The declaration exists before and regardless of that decision: rejection does not erase the statement, and publication does not compel trust.

The structure resembles a license notice in one respect: the publisher states clear terms that others can read and evaluate. Here the terms concern authority claims. Permissions to use, modify and redistribute the software remain governed by its license.

This page explains the declaration and suggests evaluation practices. The records and evidence checks discussed below are optional practices, not additional declaration requirements.

## Start with the exact artifact

An artifact is the software in hand: an archive, wheel, binary or container. Machine-readable metadata distributed with it references the declaration. A content digest can help identify the exact bytes a claim concerns; a consumer may require one under its own policy. The declaration does not mandate a digest. A statement must also make clear which release or variant it covers. A release offered on several platforms may have different commitments for each one. Sharing a name does not make their evidence or support interchangeable.

An operator makes a scoped statement about the artifact. That operator might be the producer, an independent auditor or a team maintaining a downstream build. None automatically speaks for the others.

## An optional way to record the evaluation

| Record | Who supplies it | What belongs in it |
| --- | --- | --- |
| Assertion | Operator | Identified software, claims, scope, evidence and any stated dates or commitment period. |
| Findings | Person or system checking the claim | Checks and outcomes against supplied evidence and evaluation time. |
| Decision | Consumer | Whether to accept, reject or defer a claim for a stated use under a particular policy. |

These records can help explain a decision; the declaration does not require them. The operator makes its statement. The consumer makes its own decision. Establishing who made a statement and which software it concerns does not establish that everything it says is true.

## Findings can coexist

You might establish who published a statement but find that its test report covers a different platform. Keep both findings: knowing the publisher does not resolve the gap in the evidence.

A consumer can ask for the missing evidence, decline to rely on the claim, or decide that the check is not needed for its use. The findings describe what was checked; the decision describes what the consumer chooses to do.

## One artifact, two reasonable decisions

Suppose a publisher makes production and maintenance claims. Both consumers establish who made the statements and which release they concern.

| Consumer | Production claim | Maintenance claim | Reason |
| --- | --- | --- | --- |
| Research team | Accepts | Rejects reliance | Maintains its own copy. |
| Service operator | Accepts | Accepts | Relies on the stated maintenance within its scope. |

A consumer can record its intended use and policy alongside the decision. Acceptance does not have to be sent back to the publisher, and it does not transfer to other consumers automatically.

## How long is support promised?

A statement might say, “We will provide security fixes for this Linux release through <time data-example-date="commitment">the end of next year</time>.” The consumer can compare that period with how long it plans to use the release.

State the support period explicitly. Publishing a release does not imply ongoing maintenance, and a statement with no support end date should not be read as a promise to maintain it forever.

## Open-source and enterprise software

AUTHORITY.md is compatible with open-source and enterprise software; those categories can overlap. Claims and acceptance are independent of pricing and business model.

- A community maintainer can describe a public release.
- A vendor can describe maintenance for a proprietary product.
- An enterprise team can approve an internal artifact for a bounded use.
- An independent auditor can publish findings about any artifact it examined.

Evidence may be public or access-controlled, but consumers need access to what their policies require. The declaration does not grant license rights or require publication of proprietary source code.

## Evidence and independent examination

A declared claim is made on the operator's own account. An attested claim cites an independent statement. An audited claim cites an examination against stated criteria. These descriptions explain the basis; they are not rankings.

Keep the examiner, subject, method, scope and result visible. An auditor can speak for its own examination without controlling the artifact, and a publisher can cite that statement without pretending to be the auditor. An external report can be evidence without being an artifact-attached claim under this declaration. Invoking the declaration still requires the artifact to carry the reference described in its attachment provision.

A signature may help establish who issued a statement. It does not by itself establish the truth of the statement or require a consumer to accept it.

Choose tools for the questions your use requires. The [comparison with existing practices](related-practices.md) connects those questions to the CRA, SLSA, Sigstore, SECURITY.md and SBOMs, and explains when an additional declaration is useful.

For an optional discussion of statement freshness, see [refreshing a statement](examples.md#further-detail-refreshing-a-statement).

Continue with [how to make commitments and choices explicit](use-it.md), or explore [what this could change](why-now.md#what-this-can-change).
