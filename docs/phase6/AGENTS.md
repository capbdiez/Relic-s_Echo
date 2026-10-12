# AGENTS - RELICS OF ECHO
## Development Guidelines and Standards


### **Coding Standards**
#### **TypeScript Standards**
- **Strict Mode**: Enable all TypeScript strict flags
- **ESLint**: Prettier + Airbnb + TypeScript plugin
- **Code Formatting**: 2-space indentation, semicolons
- **Naming Conventions**: camelCase for variables, PascalCase for components
- **Type Definitions**: Interfaces for public APIs, types for internal usage
- **Error Handling**: Proper try-catch blocks with meaningful error messages
- **Comments**: JSDoc for public methods, inline comments for complex logic

#### **JavaScript Standards**
- **ES6+ Features**: Arrow functions, spread operator, destructuring
- **Module System**: ES6 imports/exports, type augmentation
- **Async/Await**: Promise chains for better readability
- **Memory Management**: Proper cleanup of event listeners and timers
- **Performance**: Efficient algorithms and data structures

### **Documentation Rules**
#### **README Requirements**
- **Project Overview**: Game description, objectives, features
- **Setup Instructions**: Development environment setup
- **Running Tests**: Test commands and procedures
- **Deployment Guide**: Build and deployment process
- **Contributing**: Contribution guidelines and code of conduct

#### **API Documentation**
- **Auto-Generation**: JSDoc comments for all public APIs
- **Examples**: Usage examples for complex endpoints
- **Error Responses**: Standardized error format and codes
- **Versioning**: Semantic versioning for API changes

#### **Code Comments**
- **Complex Logic**: Inline comments explaining reasoning
- **Algorithms**: Comments for non-obvious implementations
- **Temporary Code**: Clear TODO and FIXME markers
- **API Changes**: Notes for breaking changes

### **Testing Requirements**
#### **Unit Testing**
- **Backend**: Jest with SuperTest for API testing
- **Frontend**: Jest with React Testing Library
- **Engine**: Custom test frameworks for game logic
- **Coverage**: Minimum 85% code coverage

#### **Integration Testing**
- **API Contracts**: Contract testing with Postman
- **Database**: Test with real database connections
- **End-to-End**: User workflow testing
- **Performance**: Load testing with realistic scenarios

#### **Acceptance Testing**
- **Milestone Reviews**: Formal documentation of milestone completion
- **User Testing**: Regular user feedback sessions
- **Regression Testing**: Ensure no functionality breaks
- **Performance Testing**: Continuous monitoring and optimization

### **Scope-Control Rules**
#### **Change Management**
- **Feature Proposals**: Document with user stories and acceptance criteria
- **Impact Analysis**: Assess effect on existing systems
- **Priority Ranking**: Business value vs. technical complexity
- **Approval Process**: Multiple stakeholders review for significant changes

#### **Scope Creep Prevention**
- **Definition of Done**: Clear criteria for feature completion
- **Buffer Time**: 20% schedule buffer for unexpected issues
- **Regular Reviews**: Weekly scope assessment and adjustment
- **Documentation**: All changes documented and communicated

### **Architecture Compliance Rules**
#### **Design Patterns**
- **Game Engine**: State pattern for game states, Strategy pattern for abilities
- **Data Access**: Repository pattern for database operations
- **API Design**: Layered architecture with clear separation
- **Error Handling**: Centralized error handling and retry logic

#### **Code Quality**
- **Complexity**: Keep functions under 20 lines, methods under 10 lines
- **Dependencies**: Minimal external dependencies
- **Coupling**: Loose coupling between components
- **Cohesion**: High cohesion within modules

### **Development Process**
#### **Pull Request Standards**
- **Code Review**: All PRs require at least 2 approvals
- **Testing**: Tests must pass before merge
- **Documentation**: Documentation updated with code changes
- **Branch Strategy**: Feature branches, regular merges to main

#### **Release Process**
- **Version Control**: Semantic versioning
- **Build Automation**: CI/CD pipeline
- **Testing Pipeline**: Automated testing on every commit
- **Deployment**: Staging to production with rollback capability

### **Quality Assurance**
#### **Code Quality Metrics**
- **Type Safety**: 100% type checking
- **Test Coverage**: Minimum 85% for production code
- **Code Complexity**: Maintain cyclomatic complexity < 10
- **Documentation**: 100% JSDoc coverage for public APIs

#### **Performance Standards**
- **Load Time**: Under 2 seconds for initial load
- **Frame Rate**: 60 FPS on target hardware
- **Memory Usage**: Under 512MB for typical gameplay
- **Network**: Under 100ms latency for real-time features

### **Continuous Improvement**
#### **Feedback Loop**
- **Weekly Retrospectives**: Process improvement discussions
- **Monthly Code Reviews**: Architecture and design assessments
- **Quarterly Audits**: Security and performance reviews
- **Annual Planning**: Strategic direction and goals

#### **Knowledge Sharing**
- **Documentation**: All decisions and lessons learned documented
- **Training**: Regular skill development sessions
- **Code Reviews**: Pair programming and mentorship
- **Community**: Contribution to open source projects

### **Compliance and Ethics**
#### **Data Privacy**
- **User Data**: Minimum data collection principle
- **Data Security**: Encryption and secure storage
- **User Consent**: Clear privacy policies and consent mechanisms
- **Data Retention**: Reasonable data retention periods

#### **Accessibility**
- **WCAG Compliance**: 2.1 AA standards for UI
- **Screen Readers**: Proper ARIA labels and announcements
- **Color Contrast**: Accessible color schemes
- **Keyboard Navigation**: Full keyboard accessibility

#### **Environment**
- **Resource Usage**: Efficient resource consumption
- **Carbon Footprint**: Minimal energy usage
- **Sustainability**: Long-term maintenance considerations
- **Social Impact**: Positive community engagement
