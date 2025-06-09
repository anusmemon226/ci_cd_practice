variable "ami_id" {
    description = "AMI ID"
    type = string
}
variable "key_name" {
    description = "Key-Value pair for EC2 Instance"
    type = string
}
variable "vpc_id" {
    description = "Value of VPC ID"
    type = string
}
variable "aws_region" {
    description = "Region where instance will run"
    type = string
}
variable "subnet_id" {
    description = "Subnet ID"
    type = string
}