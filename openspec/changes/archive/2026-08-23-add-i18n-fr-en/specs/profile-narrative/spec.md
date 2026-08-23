# profile-narrative Specification

## MODIFIED Requirements

### Requirement: Bilingual English/French content

All user-facing text of the portfolio SHALL be available in both English and French. The dual-profile narrative — builder of complete business management applications and open-source/Linux enthusiast — SHALL be fully expressed in each locale. Simulated terminal chrome (commands, flags, paths) remains exempt as defined by the content-localization specification.

#### Scenario: French narrative parity

- **WHEN** a visitor lands on the French home page
- **THEN** the intro presents both identity pillars in French, with the business-builder pillar visually dominant, mirroring the English narrative structure

#### Scenario: No mixed-language prose

- **WHEN** any page of a given locale is rendered
- **THEN** every visible label, heading, paragraph, and call-to-action is written entirely in that locale's language, excluding simulated terminal chrome
