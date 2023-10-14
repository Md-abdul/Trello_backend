Entities:
User

Attributes: UserID (PK), Name, Email, ProfilePicture, Role
Project

Attributes: ProjectID (PK), Name, Description, StartDate, EndDate
Relationships: ProjectManager (FK to User.UserID)
Task

Attributes: TaskID (PK), Title, Description, DueDate, Priority, Status
Relationships: AssignedTeamMembers (FK to User.UserID), ProjectID (FK to Project.ProjectID)
Team

Attributes: TeamID (PK), TeamName
Relationships: TeamMembers (FK to User.UserID)
Relationships:
Project Manager (User) manages Project (1 to many)
User can belong to multiple Teams (many to many)
Task is assigned to multiple Team Members (many to many)
Team has multiple Team Members (1 to many)

ER Diagram:

  +--------+        +-----------+      +--------+
  |  User  |        |  Project  |      |  Team  |
  +--------+        +-----------+      +--------+
       |                 |                  |
       | manages         | belongs to       | has
       |                 |                  |
       V                 V                  V
  +--------+        +-----------+      +------------+
  |  Task  |        |  User     |      |  TeamUser   |
  +--------+        +-----------+      +------------+
       |                 |
       | assigned to     | has
       |                 |
       V                 V
  +--------------------------+
  |         UserTeam        |
  +--------------------------+
