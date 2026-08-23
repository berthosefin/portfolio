## ADDED Requirements

### Requirement: Direct contact channels
The contact page SHALL list exactly three channels in this order: email first, LinkedIn profile second, WhatsApp third. Each entry SHALL be a working link (`mailto:` or `https://`) whose visible text shows the real address or handle. No other contact channel SHALL be presented.

#### Scenario: Channel order and targets
- **WHEN** the contact page renders
- **THEN** email appears above LinkedIn, LinkedIn appears above WhatsApp, and each row navigates to the correct mail or external target
