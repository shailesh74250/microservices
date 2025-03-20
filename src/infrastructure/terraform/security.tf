# Security Group for ECS (Allow traffic from ALB & Outbound to DB)
resource "aws_security_group" "ecs_sg" {
  name        = "ecs-security-group"
  description = "Allow inbound traffic from ALB and outbound to DB"
  vpc_id      = aws_vpc.main.id

  # Allow inbound traffic from ALB to ECS tasks
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Replace with ALB SG if needed
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ecs-security-group"
  }
}

# Security Group for RDS (Allow only ECS tasks)
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Allow only ECS tasks to connect"
  vpc_id      = aws_vpc.main.id

  # Allow ECS tasks to connect to RDS
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_sg.id] # Only allow ECS
  }

  # Allow outbound traffic (for database updates)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-security-group"
  }
}

# IAM Role for ECS Tasks (Allow access to CloudWatch, S3, etc.)
resource "aws_iam_role" "ecs_task_role" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

# Attach AmazonECSTaskExecutionRolePolicy to allow pulling images from ECR
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
