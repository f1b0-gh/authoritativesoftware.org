---
type: Guide
title: Follow the claim, not the name
description: A simple maintenance commitment, customer-specific support and optional implementation details.
---
# Follow the claim, not the name

Start with a simple question: **who promises to maintain this release, and until when?** These examples are fictional. Their dates adjust to the day you read the page.

## A complete adoption example

Example Vendor publishes illustrative-parser 1.4.2 for Linux x86-64 with this statement:

> We maintain this release. We investigate reported vulnerabilities and provide fixes for confirmed vulnerabilities through <time data-example-date="commitment">the end of next year</time>.
>
> This commitment covers the parser in this Linux release. It excludes other platforms, new features and applications that use the parser. Response deadlines require a separate support agreement.

The statement names Example Vendor, gives a contact at support@example.invalid, and was issued <time data-example-date="issued">30 days ago</time>. The accompanying SECURITY.md explains how to report a vulnerability.

The release carries metadata referencing AUTHORITY.md and this statement. A consumer can see **who is making the promise, which software it covers, what work is promised and when support ends**.

A team can then decide whether that is enough. For a critical service, it might check the vendor's maintenance history and require an agreed response time before relying on the promise. Publishing the statement makes the commitment clear; it does not prove that the vendor can deliver it.

## Public support, with an extension for one customer

Example Vendor could offer the same release under two statements:

| Statement | Who it covers | Illustrative commitment |
| --- | --- | --- |
| Public | All consumers of the identified Linux release | Security fixes through <time data-example-date="commitment">the end of next year</time>. |
| Customer-specific supplement | Example Customer, under a named support agreement | The same security maintenance for one additional year after that public support period, with response times specified in the agreement. |

The supplement names the public statement it extends, the customer and the covered release. The vendor shares it with that customer, alongside metadata referencing AUTHORITY.md. The public commitment remains understandable on its own; other consumers do not receive the extension simply because they use the same software.

Both statements concern the same artifact. What differs is the maintenance offered to each audience. The customer still decides whether the extended commitment and the evidence behind it meet its needs. The declaration does not replace the support agreement.

## How the statement travels with the release

<details>
<summary>Optional detail: files and release metadata</summary>

These filenames and JSON fields illustrate one possible arrangement, not a standardized schema or evidence of real adoption.

Suppose Example Vendor distributes a release bundle containing these files together:

```text
illustrative-parser-1.4.2-release/
  illustrative-parser-1.4.2-linux-x86_64.tar.gz
  release-metadata.json
  AUTHORITY.md
  operator-statement.md
  SECURITY.md
```

The `AUTHORITY.md` file contains the general declaration, version 0.1.0. The operator's own claims are in `operator-statement.md`; copying the general declaration alone would not tell a consumer what Example Vendor undertakes.

In this fictional arrangement, `release-metadata.json` contains:

```json
{
  "artifact": {
    "file": "illustrative-parser-1.4.2-linux-x86_64.tar.gz",
    "version": "1.4.2",
    "platform": "linux-x86_64"
  },
  "declaration": {
    "file": "AUTHORITY.md",
    "version": "0.1.0"
  },
  "operator_statement": "operator-statement.md"
}
```

Paths are relative to the bundle directory. The metadata travels with the software archive and references both the declaration and the operator's statement. This example identifies the archive by filename, version and platform. A consumer requiring identification of exact bytes would need a digest or other suitable evidence as well.

The fictional contact address does not establish the vendor's identity. A digest or signature can help with a particular check; neither proves that future maintenance will happen. See [related practices](related-practices.md) for those distinctions.

</details>

## An independent auditor examines existing bytes

An auditor examines a particular released archive against named criteria and publishes a separate report. A consumer can consider that report without requiring a rebuild or treating the auditor as a delegate of the publisher.

The report is evidence. It is not automatically an authority claim attached under this declaration: that requires the explicit reference in metadata distributed with the artifact.

The auditor speaks for its work. A consumer checks which software was examined, who performed the examination, what it covered and what the evidence shows. A publisher may cite that audit in a separate claim, preserving the distinction between the two statements.

## An agent helps produce a fork

An agent adapts a library for another platform. A maintainer reviews and releases the resulting archive. Upstream notices remain, but the archive is a different artifact.

The downstream maintainer can attach its own production and maintenance claims, with metadata referencing the declaration. It can cite an upstream assertion as evidence for a particular derived claim. Nothing automatically transfers the upstream operator's commitments to the fork.

The same rules apply when a person writes every change.

## A delegate has a narrower mandate

A publisher authorizes a registry to make specified distribution claims about identified releases until <time data-example-date="delegation">90 days from today</time>. The registry cannot turn that mandate into a maintenance claim or appoint another delegate unless the authorization explicitly permits it.

A consumer relying on the mandate needs to establish its scope and time bounds. Knowing that the registry made a statement is insufficient if the consumer cannot establish that the publisher authorized it.

## A release contains several artifacts

A publisher distributes a Linux wheel, a macOS wheel and a source archive. A statement can concern all three, but each claim must say which variants it covers. Maintenance for the Linux wheel and a review of the source archive are different commitments.

A successful examination of the Linux wheel alone is not evidence that the macOS wheel passed the same examination. Collection membership does not broaden a claim's scope automatically.

## An application embeds a dependency

The dependency archive and the finished application are different artifacts. The dependency's assertions remain about their subjects. The application publisher can cite those assertions and describe its own integration work; it cannot simply apply a dependency's support promise to the whole application.

## Further detail: refreshing a statement

The examples above need only a support end date. Some publishers and consumers may also want a separate date for checking that a statement is still current.

<details id="when-a-support-statement-needs-refreshing">
<summary>Optional detail: statement expiry and support duration</summary>

Suppose a maintainer promises security fixes for a Linux release through <time data-example-date="commitment">the end of next year</time>. They also give their statement a shorter validity period, asking consumers to check for an updated statement after that date.

| What the date tells you | Date |
| --- | --- |
| When the statement was issued | <time data-example-date="issued">30 days ago</time> |
| How long the statement is current | Through <time data-example-date="expired">yesterday</time> |
| How long the promised support lasts | Through <time data-example-date="commitment">the end of next year</time> |

As of <time data-example-date="reference">today</time>, a consumer who requires a current statement should ask for an update. That does not mean support ended yesterday: the earlier promise specified a later support end date. It also does not show that the software has become unsafe.

The shorter date tells the consumer when to seek fresh information. It does not erase the support promise or settle its legal effect. AUTHORITY.md does not require this extra expiry date; use it only if it helps the publisher and consumer.

<span id="expired-and-contradicted-at-the-same-time"></span>

**When checks disagree**

Suppose that support statement also references a test report claiming that a particular regression was fixed. A reproducible counterexample conflicts with that report.

The consumer's record can retain both findings:

Evaluation date: <time data-example-date="reference">today</time>.

```text
Claim: maintenance-linux
Time finding: expired
Evidence finding: counterexample conflicts with the referenced report
Decision: rejected
Policy reason: current assertion required; conflicting evidence also unresolved
```

No precedence rule needs to delete one finding. The scope of the contradiction matters: a failed test is not proof that every claim by the publisher is false.

</details>

Return to [making commitments and choices explicit](use-it.md) or read the [declaration](declaration.md).
