# profile-narrative Specification

## Purpose

Governs the story the portfolio tells about its owner: a dual-profile narrative presenting him as a builder of complete business management applications with real accounting and payroll experience, and as an open-source/Linux enthusiast — delivered bilingually in English and French.

## Requirements

### Requirement: Dual-profile hero narrative
The home page intro SHALL present both identity pillars: building complete business management applications (finance, VAT, commercial management, ERP) and open-source Linux work (Hyprland ricing, Rust CLI published on crates.io). The business-builder pillar SHALL be visually dominant; the open-source pillar SHALL be clearly present but secondary.

#### Scenario: Hero communicates both profiles
- **WHEN** a visitor lands on the home page
- **THEN** the intro names both the business-application focus and the open-source/Linux involvement before any scroll interaction

### Requirement: Accounting and payroll background surfaced
The portfolio SHALL state, in at least one prominent location reachable from the home page, that the owner has held a professional accounting/payroll position and applies that domain knowledge in his software projects.

#### Scenario: Domain credibility discoverable
- **WHEN** a visitor reads the home intro or the about content
- **THEN** the accounting/payroll professional background is explicitly mentioned, framed as an asset for building management software

### Requirement: Open-source credibility markers
The narrative SHALL reference verifiable open-source facts: the Hyprland dotfiles project and the `randanarana` crate published on crates.io, each linking to its live repository/registry page.

#### Scenario: Claims are backed by links
- **WHEN** the narrative mentions dots or randanarana
- **THEN** the mention is hyperlinked to the corresponding GitHub repository or crates.io page

### Requirement: Bilingual English/French content

All user-facing text of the portfolio SHALL be available in both English and French. The dual-profile narrative — builder of complete business management applications and open-source/Linux enthusiast — SHALL be fully expressed in each locale. Simulated terminal chrome (commands, flags, paths) remains exempt as defined by the content-localization specification.

#### Scenario: French narrative parity

- **WHEN** a visitor lands on the French home page
- **THEN** the intro presents both identity pillars in French, with the business-builder pillar visually dominant, mirroring the English narrative structure

#### Scenario: No mixed-language prose

- **WHEN** any page of a given locale is rendered
- **THEN** every visible label, heading, paragraph, and call-to-action is written entirely in that locale's language, excluding simulated terminal chrome
