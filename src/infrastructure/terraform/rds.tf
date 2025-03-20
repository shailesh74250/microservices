resource "aws_db_instance" "rds_instance" {
  identifier            = "nestjs-db"
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  username            = var.db_username
  password            = var.db_password
  parameter_group_name = "default.postgres15"
  publicly_accessible  = false
  db_subnet_group_name = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  multi_az            = false
  backup_retention_period = 7
  skip_final_snapshot = true
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name = "RDS Subnet Group"
  }
}

resource "aws_security_group" "rds_sg" {
  name   = "rds-security-group"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432  # Change to 3306 for MySQL
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [var.ecs_sg_id] # Only allow ECS to connect
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "RDS Security Group"
  }
}
