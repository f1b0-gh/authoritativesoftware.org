---
type: Explanation
title: How AUTHORITY.md fits with existing practices
description: When a shared declaration of operator claims helps beyond SECURITY.md and an SBOM, and how it fits with CRA, SLSA and Sigstore.
---
# How AUTHORITY.md fits with existing practices

Publishers already have ways to describe support, report vulnerabilities and provide evidence about releases. AUTHORITY.md offers a common declaration for stating who asserts which claims about particular artifacts. Those claims can refer to existing policies and evidence.

The purpose is to make an operator's position clear enough for a consumer to evaluate. The declaration is not a complete verification protocol. This page explains how other practices can contribute; it adds no requirements to the declaration.

## Why use AUTHORITY.md as well?

SECURITY.md can already describe supported versions, reporting channels and security commitments. An SBOM records software components and their relationships. Neither needs replacing. If those records already make clear who stands behind the software, what they undertake and where their commitments end, another document may add little. [GitHub security-policy guidance](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/add-security-policy), [NIST SBOM definition](https://csrc.nist.gov/glossary/term/software_bill_of_materials)

AUTHORITY.md proposes a common way to interpret claims when those boundaries are harder to follow: each operator speaks for its own claims about particular artifacts; forks do not automatically inherit upstream authority; multiple operators may make claims; consumers decide which ones to rely on. Claims can concern production, review, support or designations, beyond security policy alone.

Consider a fictional component used in a vendor's product:

| Operator | What it declares | Boundary that matters |
| --- | --- | --- |
| Upstream project | Security fixes for its latest source release. | Its policy does not promise maintenance of every downstream package. |
| Vendor | Maintenance of its Linux 1.4 package through <time data-example-date="commitment">the end of next year</time>. | The vendor undertakes that work on its own account, for a named package. |
| Independent examiner | Review of the parser in a specified source archive. | The examination is not a maintenance undertaking or approval of the whole product. |

The SBOM can identify the included component. The security policies can describe reporting and supported versions. The authority statements make explicit whose claims apply to which artifacts and activities, without treating one party's statement as another party's promise.

All of this could be written in existing documents. The proposed benefit is a shared declaration of scope, non-inheritance and independent consumer acceptance. Reusing an existing policy is preferable to maintaining conflicting copies: an operator's statement can reference it, while the artifact's machine-readable metadata supplies the explicit declaration reference required by AUTHORITY.md. The filename alone adds no assurance.

## Different questions, complementary tools

| Practice | Question it helps answer | How it can accompany an authority claim |
| --- | --- | --- |
| Cyber Resilience Act | Which cybersecurity duties apply to a product and the parties involved? | An operator can describe relevant support commitments; the law determines the duties. |
| SBOM | Which software components and relationships are recorded? | A claim can refer to that inventory; inclusion does not transfer a component maintainer's commitments to the whole product. |
| SLSA provenance | Where and how was this software produced? | A claim about production can refer to build or source evidence. |
| Sigstore | Can the consumer authenticate a signed artifact or statement? | Signatures can help establish attribution and detect changes. |
| SECURITY.md | Which versions receive security support, and how should vulnerabilities be reported? | A statement can reference that policy and identify the artifacts and operator it concerns. |

## Cyber Resilience Act: obligations and support periods

The EU Cyber Resilience Act sets cybersecurity duties for products and actors within its scope. Article 13 requires manufacturers to determine a support period and communicate its end date. Article 24 sets distinct obligations for qualifying open-source software stewards; that role is not a label for every maintainer. [Regulation (EU) 2024/2847, Articles 3, 13 and 24](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)

The CRA has been in force since **10 December 2024** (status checked **24 November 2026**). [European Commission overview](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

Its general application begins on **11 December 2027**; Article 14 reporting obligations began applying on **11 September 2026**. Scope, role and transitional provisions matter when assessing a particular situation. [Articles 69 and 71](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)

An authority declaration can communicate a support undertaking. It does not establish CRA compliance, select an operator's regulatory status or remove applicable duties. Voluntary adoption of AUTHORITY.md and obligations imposed by law are separate matters. [Articles 13 and 24](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)

## SLSA: evidence about production

SLSA provenance describes where, when and how software was produced. Build provenance connects a build output to its source and build process; source provenance concerns the creation and management of source revisions. [SLSA provenance specification](https://slsa.dev/spec/v1.2/provenance)

A publisher could cite that provenance when asserting that it produced a release. A consumer then evaluates the evidence and its relevance to the claim. A maintenance undertaking answers a further question: what work will the operator continue to perform after that release? The production record and the future undertaking have different subjects.

## Sigstore: authenticate what was signed

Sigstore provides tools to sign and verify software artifacts and statements, with identity-based signing and transparency records. Those mechanisms can help a consumer check the origin and integrity of material it receives. [Sigstore overview](https://docs.sigstore.dev/about/overview/)

For example, a signature over a release statement can help attribute that statement to its signer. If the statement identifies an archive by its digest, the consumer can also check that the archive's bytes match. The consumer still needs to establish whether the signing identity is one it recognizes for that claim.

A signature cannot establish that a future maintenance promise will be fulfilled. That requires continued work and evidence of delivery over time. AUTHORITY.md does not mandate signing or digests; consumers can require them where their intended use calls for those checks.

## SECURITY.md: a policy to reference

GitHub's SECURITY.md convention provides a place to explain supported versions and vulnerability-reporting procedures. A project may already express much of its security support policy there. [GitHub security-policy documentation](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/add-security-policy)

An operator can reference that policy in its statement, naming the policy revision and the release variants it covers. This lets a consumer distinguish, for example, a project's general reporting channel from a particular vendor's undertaking to maintain its Linux package. The declaration's requirement for a reference in metadata distributed with the artifact still applies.

## SBOM: components and relationships

A software bill of materials records details about software components and their supply-chain relationships. It helps a consumer understand the software's composition. [NIST SBOM definition](https://csrc.nist.gov/glossary/term/software_bill_of_materials)

Listing a library as a dependency does not itself say that the library's author maintains the application using it, or that the application's vendor supports every version of the library. Those are claims for the relevant operators to make explicitly. The inventory can inform their statements and the consumer's assessment.

AUTHORITY.md can be referenced through suitable SBOM metadata distributed with the artifact, as the declaration's implementation section allows. There is no need to invent another inventory format. What matters is that the consumer can distinguish the recorded components from the commitments made about them.

## Choose the means for the decision

Start with the claim and the consumer's intended use. Then choose the evidence needed: provenance for a production claim, a signature for attribution, a support policy for scope, or maintenance history and available resources for confidence in continued delivery.

These mechanisms answer particular questions. The operator declares its claims, and each consumer decides whether the available evidence and commitments are sufficient.

The [publisher and consumer guide](use-it.md) explains how to state useful limits. The [complete adoption example](examples.md#a-complete-adoption-example) shows a fictional release with attached metadata and a scoped operator statement.
