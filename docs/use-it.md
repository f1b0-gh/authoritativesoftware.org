---
type: Guide
title: Make commitments and choices explicit
description: Practical questions for publishers and consumers, without prescribing how they implement the answers.
---
# Make commitments and choices explicit

Start with one release and one decision someone needs to make about it. The purpose is to replace an assumption with a clear statement: what is being offered, what supports it, and what the consumer will rely on.

An operator can publish its claims without waiting for consumer agreement. Each consumer decides independently what to rely on. The suggestions below are practical guidance, not additional declaration requirements.

## For publishers

### 1. Say which release you mean

Identify the software and versions your statement covers. A content digest can help a consumer check that it has the same bytes, but the declaration does not require one. If a release has several platform variants, identify their content and say whether you examined or maintain all of them. A statement about one variant should not silently become a statement about the others.

Include the declaration in your repository and reference it through machine-readable metadata distributed with the artifact. State who makes the claims and what they cover. A repository notice alone does not meet the attachment requirement.

The declaration lists illustrative package and container metadata fields. These are not guaranteed to be supported fields or registered standards; choose a mechanism your publishing tools and consumers can interpret.

### 2. Separate your contributions and commitments

Distinguish what you wrote, built, reviewed, approved and undertake to maintain. If an agent performed part of the work, explain that contribution without attributing every later responsibility to it or the original author.

A useful statement might be:

> We reviewed the parser changes in this release. We will maintain the Linux version through <time data-example-date="commitment">the end of next year</time>, including security fixes for this component. Other platforms and new features are outside that commitment.

An auditor can describe its own examination. A downstream team can describe its own maintenance. Neither needs to pretend to speak for the original publisher.

### What makes a declaration worth publishing?

For a vendor, a clear maintenance undertaking makes sustained work a visible part of its offer: which versions it supports, what it will do and where a separate service agreement is needed. For a volunteer maintainer, an explicit limit can help users plan without assuming that a released package comes with ongoing support.

These fictional statements illustrate different scopes and levels of commitment:

| Position | Illustrative statement |
| --- | --- |
| Production only | We produced this release. We offer no ongoing maintenance for it. |
| Work as capacity permits | We review reported issues as volunteer capacity permits. We promise no response deadline, fix or maintenance period. |
| Funded maintenance | We maintain the Linux 1.4.x releases through <time data-example-date="commitment">the end of next year</time>. We investigate security reports and provide fixes for confirmed vulnerabilities in those releases. Response deadlines and other service levels require a separate agreement. |

The phrase “best effort” alone leaves consumers guessing. Name the activities, limits and conditions instead. A declaration can help describe an undertaking; it does not supply the people or funding needed to deliver it. Particular promises, warranties, contracts and applicable legal duties need to be considered on their own terms.

### Public commitments and customer-specific support

A publisher can make a public authority statement for all consumers and a separate statement for particular customers. For example, the public statement could promise security fixes for a Linux release through <time data-example-date="commitment">the end of next year</time>, while a customer-specific statement extends that support for one additional year.

Both can use AUTHORITY.md. The declaration supplies the common principles; the operator's statements identify the commitments and who they cover. Name the customer or eligible group, the exact releases, the extra support period and any conditions. Say which public statement the customer-specific statement supplements and whether it changes any of those terms.

The customer-specific statement can be shared privately with the customers concerned. Metadata distributed with their artifact should reference the declaration and make the applicable statements discoverable to them. A public consumer should not have to read a private statement to understand the public commitment.

Extended support for one customer does not extend the offer to everyone. Each consumer decides whether its applicable commitments are sufficient. Pricing, response-time guarantees and other contractual terms can remain in a separate service agreement; AUTHORITY.md does not replace it or change the software license.

### 3. Explain why someone could rely on it

Point to the evidence supporting each statement: the review, examination, test results, work performed or a clearly described undertaking. Explain what that evidence covers and what it leaves unanswered.

Identify who is making the statement and how a consumer can ask about it. A familiar name is useful context, but it does not answer every question about responsibility.

Choose verification tools to answer specific questions. Signing can help a consumer authenticate a statement; a digest can identify the bytes it concerns; provenance can describe production. Evidence of sustained maintenance comes from the work itself. The [comparison with existing practices](related-practices.md) explains how these tools and policies can fit together.

### 4. State the limits and the dates

Say when the statement was made and how long any promised maintenance lasts. Identify the covered versions, platforms and activities, along with any conditions or exclusions.

A support end date is enough for the simple maintenance example. [Separate statement expiry dates](examples.md#further-detail-refreshing-a-statement) are an optional detail.

### 5. Communicate changes

If you publish updates or revocations, explain where consumers can find them and preserve enough history to understand what changed. The declaration leaves that publication mechanism to the operator. Consumers may require one for their own use; silence does not prove that no revocation occurred.

## For consumers

### 1. Decide what your use requires

A teaching exercise, an internal service and a product sold to customers may need different commitments. Write down what matters for your use before treating a publisher's statement as sufficient.

You may need evidence about where a release came from without relying on its publisher for maintenance. Another consumer may need both.

### 2. Examine each claim separately

Identify the party making it, the software it covers, the evidence, the limits and the relevant dates. Ask what is missing or conflicts with the statement.

Keep those findings together. A statement can be out of date and have conflicting evidence at the same time. One finding should not erase the other.

### 3. Record what you choose to rely on

Separate your findings from your decision. You can accept a claim, reject reliance on it, or defer while obtaining more evidence.

For example:

> We accept the account of who produced this release for our research use. We do not rely on the publisher for maintenance because our team maintains its own copy.

The publisher does not make that decision for you. An agent helping you evaluate software should work within your requirements rather than choose them for you.

### 4. Know when to reconsider

Keep your decision tied to the release you actually use. A new release, changed commitment, withdrawal, new evidence or approaching deadline may require another assessment.

Decide what that means in practice: requesting clarification, pausing a new deployment, finding another maintainer or taking responsibility internally. A changed statement does not by itself decide what happens to already running software.

## What this gives you today

Use the questions to clarify a release description, a maintenance offer, a review or an internal acceptance decision. You should be able to explain who says what, what supports it, and why you rely on it.

AUTHORITY.md is still a draft. This guide offers a way to structure those questions; it does not certify the answers. Start with the [complete adoption example](examples.md#a-complete-adoption-example), then follow the other examples to see how consumers can reach different decisions.
