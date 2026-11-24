---
type: Declaration
title: AUTHORITY.md
description: The AUTHORITY.md declaration, version 0.1.0.
---
# AUTHORITY.md

**Version 0.1.0**

## Purpose

This declaration defines how authority over software artifacts may be asserted and interpreted.

It does not modify the software license, grant permissions, or impose restrictions.

---

## Definitions

**Artifact** — A distributable unit of software (source, binary, package, container).

**Operator** — A person or organization asserting authority over artifacts.

**Authority** — An explicit claim by an Operator regarding provenance, support, trademarks, or operational guarantees for specific artifacts.

**Consumer** — Any person or system evaluating or using an artifact.

---

## Principles

### 1. Orthogonal to License

This declaration does not:
- Modify the software license
- Restrict use, modification, or redistribution
- Create contractual obligations

All license rights remain unchanged.

### 2. Explicit Attachment Required

Authority applies only to artifacts that explicitly reference this declaration via machine-readable metadata distributed with the artifact.

Forks and derivatives do not inherit authority unless explicitly reasserted.

### 3. Scope of Authority

Authority may cover:
- Provenance and build reproducibility
- Support or maintenance commitments
- Trademark designations ("official", "certified")
- Voluntary security disclosure practices
- Jurisdictional representations

Authority does not imply:
- Fitness for purpose
- Absence of defects
- Mandatory security obligations
- Regulatory designation (manufacturer, economic operator, data controller, etc.)

### 4. Operator Identity

Operators asserting authority should be identifiable through:
- Legal name or recognized identity
- Contact mechanism
- Jurisdiction (informational only)

### 5. Versioned and Temporal

Authority claims apply to specific artifact versions and may be updated by the Operator at any time.

Revocations, if published, apply only where and how the Operator chooses to publish them. No publication mechanism is required or implied.

### 6. Machine-Readable

Authority claims should be interpretable by automated systems through artifact-attached metadata.

### 7. Non-Exclusive and Contestable

Authority is:
- Non-exclusive (multiple operators may assert authority)
- Contestable (any Consumer may reject claims)
- Optional (no claim is required for valid software)

### 8. Separation from Commerce

This declaration does not:
- Define pricing or payment
- Create binding service levels
- Replace contracts or insurance
- Prevent competition or forks

---

## Implementation

**Minimal adoption:**

1. Include this file in your repository
2. Reference it in artifact metadata:
   - Package manifests (`authority: AUTHORITY.md`)
   - Container labels (`org.authority=AUTHORITY.md`)
   - SBOM metadata
   - Release manifests

**Authority claims travel with artifacts, not repositories.**

---

## Summary

Software is free to copy.  
Authority must be explicitly asserted.  
Trust is optional and contestable.
