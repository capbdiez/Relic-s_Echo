# ARCHITECTURE - RELICS OF ECHO
## System Architecture and Design


### **Major Subsystems**
#### **Core Game Engine**
- **Name**: Echo Engine
- **Language**: TypeScript + WebGL
- **Purpose**: Game logic, physics, rendering, input handling
- **Ownership**: Game Development Team
- **Public API**: Game state management, player control, collision detection

#### **Character Progression System**
- **Name**: Attribute Manager
- **Language**: TypeScript + PostgreSQL
- **Purpose**: Character stats, class calculation, skill management
- **Ownership**: Backend Team
#### **Combat System**
- **Name**: Battle Engine
- **Language**: TypeScript (Client) + Node.js (Server)
- **Purpose**: Real-time combat, damage calculation, cooldown management
#### **Portal System**
- **Name**: Rift Manager
- **Language**: TypeScript
- **Purpose**: Portal mechanics, wave spawning, difficulty scaling
#### **Asset Management System**
- **Name**: Asset Pipeline
- **Language**: Python + TypeScript
- **Purpose**: Art pipeline, version control, hot loading
#### **Authentication System**
- **Name**: Auth Gateway
- **Language**: Node.js + TypeScript
- **Purpose**: User management, session handling, security
#### **Real-time Communication System**
- **Name**: Socket Hub
- **Language**: Node.js + TypeScript
- **Purpose**: WebSocket management, player synchronization

### **Ownership Boundaries**
#### **Frontend Team Responsibilities**
- Game UI development
- Character animations and sprites
- Player input handling
- Local game state management
- Audio system integration

#### **Backend Team Responsibilities**
- Server-side game logic
- Character progression storage
- Player data management
- Authentication and authorization
- Real-time communication

#### **Art Team Responsibilities**
- Asset creation and pipeline management
- Animation production
- UI/UX design
- Visual effects creation

#### **QA Team Responsibilities**
- System testing
- Performance testing
- Compatibility testing
- User acceptance testing

### **Public vs Private State**
#### **Public State (Accessible to all)**
- **Game Rules**: All game mechanics and rules
- **High Scores**: Leaderboards and achievement data
- **Public Assets**: Shared textures and sounds
- **Server Status**: Server health and performance metrics

#### **Private State (Player-specific)**
- **Player Stats**: Character progression and abilities
- **Inventory**: Personal items and equipment
- **Progress**: Game saves and unlockables
- **Settings**: User preferences and configurations

### **Data Flow**
#### **Client-to-Server Flow**
1. **Input Events**: Player actions → Client Engine
2. **Game State**: Local calculations → Server via WebSocket
3. **Response**: Server validation → Client update
4. **Persistence**: Player data → PostgreSQL

#### **Server-to-Client Flow**
1. **Game Logic**: Server calculations → WebSocket
2. **State Updates**: Differential changes → Client Engine
3. **Events**: Notifications → UI system
4. **Commands**: Server actions → Client execution

### **Service Boundaries**
#### **Core Services**
- **AuthService**: Authentication and authorization
- **CharacterService**: Player data management
- **CombatService**: Battle logic and calculations
- **ProgressionService**: Experience and level management

#### **Infrastructure Services**
- **AssetService**: Asset delivery and caching
- **AnalyticsService**: Usage tracking and metrics
- **NotificationService**: In-game messages and alerts
- **BackupService**: Data backup and recovery

### **Public API Design**
#### **REST API Endpoints**
- **POST /api/auth/login**: User authentication
- **POST /api/auth/register**: New user registration
- **GET /api/players/{id}**: Player data retrieval
- **PUT /api/players/{id}/stats**: Stat updates
- **POST /api/game/save**: Game state saving
- **GET /api/leaderboards**: High score retrieval

#### **WebSocket Events**
- **joinGame**: Player joins game session
- **leaveGame**: Player leaves game session
- **updatePosition**: Player movement updates
- **attack**: Combat action execution
- **castSkill**: Ability usage
- **portalEnter**: Portal interaction

### **Security Model**
#### **Authentication Security**
- **Token-based**: JWT tokens with expiration
- **Password hashing**: bcrypt with salt
- **Session management**: Secure, stateless sessions

#### **Data Security**
- **Encryption**: TLS for all data transmission
- **Database security**: Role-based access controls
- **Input validation**: All user inputs sanitized

#### **Anti-Cheating**
- **Integrity checks**: Game state validation
- **Activity monitoring**: Suspicious behavior detection
- **Secure communication**: Encrypted WebSocket channels

### **Dependency Rules**
#### **Frontend Dependencies**
- Cannot import backend modules
- External APIs only through backend
- No direct database access
- Component libraries only from approved sources

#### **Backend Dependencies**
- Cannot access client file system
- External services through approved gateways
- Database access only through ORM
- Third-party APIs with security review

### **Testing Strategy**
#### **Unit Testing**
- **Backend**: Jest + SuperTest
- **Frontend**: Jest + React Testing Library
- **Engine**: Custom test frameworks

#### **Integration Testing**
- **API Testing**: Postman/Newman
- **Database Testing**: Jest + TestContainers
- **End-to-End**: Cypress

#### **Performance Testing**
- **Load Testing**: Artillery.io
- **Stress Testing**: Custom stress tests
- **Stability Testing**: 24-hour uptime monitoring

### **Scalability Considerations**
#### **Horizontal Scaling**
- **Load balancing**: Nginx + Docker Swarm
- **Database sharding**: PostgreSQL partitioning
- **Caching strategy**: Redis for session data
- **CDN usage**: Asset delivery optimization

#### **Vertical Scaling**
- **Database optimization**: Query tuning, indexing
- **Application optimization**: Code profiling
- **Infrastructure scaling**: Auto-scaling groups

### **Folder Structure**
```
/mnt/datos/Relics_Echo/Relic-s_Echo/
├── src/
│   ├── backend/          # NestJS application
│   │   ├── auth/         # Authentication module
│   │   ├── game/         # Game logic module
│   │   ├── players/      # Player management
│   │   └── shared/       # Common utilities
│   ├── frontend/         # Electron app
│   │   ├── assets/       # Game assets
│   │   ├── engine/       # Game engine
│   │   ├── ui/          # User interface
│   │   └── characters/   # Character system
│   └── shared/           # Common types and utilities
├── docs/                 # Documentation
├── assets/              # Art assets
└── tests/               # Test suites
```
