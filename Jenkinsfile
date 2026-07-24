pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '123456789012.dkr.ecr.ap-south-1.amazonaws.com'

        FRONTEND_IMAGE = 'agritech-frontend'
        BLOCKCHAIN_IMAGE = 'agritech-blockchain'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/pannaga-j-m/agritech-blockchain-based-agri-food-supply-chain-management.git'
            }
        }

        stage('Build React') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Compile Smart Contracts') {
            steps {
                dir('blockchain') {
                    sh 'npm install'
                    sh 'npx hardhat compile'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                sh 'docker build -t $BLOCKCHAIN_IMAGE ./blockchain'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION \
                | docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker tag $FRONTEND_IMAGE $ECR_REGISTRY/$FRONTEND_IMAGE:latest
                docker push $ECR_REGISTRY/$FRONTEND_IMAGE:latest

                docker tag $BLOCKCHAIN_IMAGE $ECR_REGISTRY/$BLOCKCHAIN_IMAGE:latest
                docker push $ECR_REGISTRY/$BLOCKCHAIN_IMAGE:latest
                '''
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                kubectl apply -f k8s/
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}