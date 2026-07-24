pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        CLUSTER_NAME = "demo-cluster"

        ECR_REGISTRY = "603433801149.dkr.ecr.ap-south-1.amazonaws.com"

        FRONTEND_IMAGE = "agritech-frontend"
        BLOCKCHAIN_IMAGE = "agritech-blockchain"

        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/pannaga-j-m/agritech-blockchain-based-agri-food-supply-chain-management.git'
            }
        }

        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                        CI=false npm run build
                    '''
                }
            }
        }

        stage('Compile Smart Contracts') {
            steps {
                dir('Blockchain') {
                    sh '''
                        npm install
                        npx hardhat compile
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
                    docker build -t ${BLOCKCHAIN_IMAGE}:${IMAGE_TAG} ./blockchain
                '''
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login \
                    --username AWS \
                    --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh '''
                    docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${ECR_REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${ECR_REGISTRY}/${FRONTEND_IMAGE}:latest

                    docker tag ${BLOCKCHAIN_IMAGE}:${IMAGE_TAG} ${ECR_REGISTRY}/${BLOCKCHAIN_IMAGE}:${IMAGE_TAG}
                    docker tag ${BLOCKCHAIN_IMAGE}:${IMAGE_TAG} ${ECR_REGISTRY}/${BLOCKCHAIN_IMAGE}:latest
                '''
            }
        }

        stage('Push Images to Amazon ECR') {
            steps {
                sh '''
                    docker push ${ECR_REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${ECR_REGISTRY}/${FRONTEND_IMAGE}:latest

                    docker push ${ECR_REGISTRY}/${BLOCKCHAIN_IMAGE}:${IMAGE_TAG}
                    docker push ${ECR_REGISTRY}/${BLOCKCHAIN_IMAGE}:latest
                '''
            }
        }

        stage('Configure kubectl') {
            steps {
                sh '''
                    aws eks update-kubeconfig \
                        --region ${AWS_REGION} \
                        --name ${CLUSTER_NAME}
                '''
            }
        }

        stage('Deploy to Amazon EKS') {
            steps {
                sh '''
                    kubectl apply -f k8s/

                    kubectl rollout status deployment/agritech-frontend --timeout=180s || true
                    kubectl rollout status deployment/agritech-blockchain --timeout=180s || true
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl get pods
                    kubectl get svc
                    kubectl get deployments
                '''
            }
        }
    }

    post {

        success {
            echo "======================================="
            echo "Pipeline completed successfully."
            echo "======================================="
        }

        failure {
            echo "======================================="
            echo "Pipeline failed."
            echo "======================================="
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}