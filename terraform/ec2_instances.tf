resource "aws_instance" "web_server" {
    count = 1
    ami           = var.ami_id
    instance_type = "t2.micro"
    key_name = var.key_name
    vpc_security_group_ids = [aws_security_group.web_sg.id]
    subnet_id = var.subnet_id

    tags = {
        Name = "web_server"
    }
}