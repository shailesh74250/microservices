
# --- ECS Cluster ---
resource "aws_ecs_cluster" "nestjs_cluster" {
  name = "nestjs-cluster"
}

# --- ECS Task Definition ---
resource "aws_ecs_task_definition" "nestjs_task" {
  family                   = "nestjs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  memory                   = "512"
  cpu                      = "256"

  container_definitions = jsonencode([
    {
      name      = "nestjs-container"
      image     = "<your-ecr-repo-url>:latest"
      memory    = 512
      cpu       = 256
      essential = true
      portMappings = [{ containerPort = 3000, hostPort = 3000 }]
    }
  ])
}

# --- ECS Service ---
resource "aws_ecs_service" "nestjs_service" {
  name            = "nestjs-service"
  cluster        = aws_ecs_cluster.nestjs_cluster.id
  task_definition = aws_ecs_task_definition.nestjs_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets = module.vpc.public_subnets
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  desired_count = 2
  load_balancer {
    target_group_arn = aws_lb_target_group.nestjs_tg.arn
    container_name   = "nestjs-container"
    container_port   = 3000
  }
}