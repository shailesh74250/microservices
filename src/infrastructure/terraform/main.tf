provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"
}

module "security" {
  source  = "./modules/security"
  vpc_id  = module.vpc.vpc_id
}

module "alb" {
  source          = "./modules/alb"
  vpc_id         = module.vpc.vpc_id
  security_group = module.security.alb_sg_id
}

module "ecr" {
  source = "./modules/ecr"
}

module "iam" {
  source = "./modules/iam"
}

module "ecs" {
  source            = "./modules/ecs"
  vpc_id           = module.vpc.vpc_id
  alb_target_group = module.alb.target_group_arn
  security_group   = module.security.ecs_sg_id
  ecr_repository   = module.ecr.repository_url
  iam_role         = module.iam.ecs_task_role
}

module "rds" {
  source          = "./modules/rds"
  vpc_id         = module.vpc.vpc_id
  security_group = module.security.rds_sg_id
}
