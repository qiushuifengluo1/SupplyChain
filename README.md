# SupplyChain
# 本小型系统于Ubuntu上开发。
# 安装环境
  # 1.安装 Docker Engine
   ▴ 更新你的包索引使用以下命令：
   sudo apt-get update
   
   ▴ 安装允许 apt 通过HTTPS使用仓库的包使用以下命令：
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
   ▴ 添加Docker官方的GPG密钥使用以下命令：
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

   ▴ 设定稳定版仓库使用以下命令：
    echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   ▴ 再次更新包索引，然后安装Docker Engine和容器，使用以下命令
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io

   ▴ 添加用户到Docker组使用以下命令（更改生效需要重启或执行newgrp docker来更新当前会话的组）
   sudo usermod -aG docker $USER

  # 2.安装go环境
    ▴ 访问官方网站（https://go.dev/dl/）下载适用于Linux版本的压缩包。或者你也可以在终端使用wget或curl下载（go的版本可以替换成自己想要的）
    wget https://go.dev/dl/go1.21.linux-amd64.tar.gz   


    ▴ 解压缩文件到/usr/local目录
    sudo tar -xvf go1.18.linux-amd64.tar.gz -C /usr/local

    ▴ 配置环境变量，打开你的 ~/.bashrc 或者 ~/.profile 配置文件，然后输入下面这些。
    export PATH=$PATH:/usr/local/go/bin
    export GOROOT=/usr/local/go
    export GOPATH=$HOME/go

    ▴ 使配置文件生效
    source ~/.bashrc  # 如果你使用的是bashrc
    source ~/.profile # 如果你使用的是profile

    ▴ 检测安装，如果输出go的版本，则安装成功。
    go version

  # 3.安装nvm、nodejs和npm
    ▴ 下载并安装nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    ▴ 运行以下命令使更改生效。也可以关闭再打开终端
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

    ▴ 验证nvm安装（出现版本即安装成功）
    nvm --version

    ▴ 使用nvm安装nodejs和npm
    nvm install node

    ▴ 验证安装（出现版本即可）
    node -v
    npm -v

  # 4.安装truffle
    ▴ 终端运行
    npm install -g truffle
    
    这里如果npm命令安装很慢可能是由于npm的服务器在国外，然后我们国家的访问速度会很慢，针对这个你可以使用淘宝镜像。
    临时设置淘宝镜像并下载truffle：
    npm install -g truffle --registry=https://registry.npmmirror.com
    永久设置淘宝镜像并下载truffle：
    npm config set registry https://registry.npmmirror.com
    npm install -g truffle



    ▴ 检测安装（出现truffle以及一些其他环境信息的版本即为安装成功）
    truffle version


  # 5.安装Ganache（我这里是使用图形化界面的，更直观，你要用命令行的也行）
    ▴ 通过访问Ganache的Github发布页面（https://github.com/trufflesuite/ganache-ui/releases）来选择版本并适用Linux系统的AppImage文件。

    ▴ 下载完成后你需要给你的AppImage设置执行权限。（yourpath为你安装ganache的路径，后面那个ganache换成你自己下载的AppImage文件）
    chmod +755 /yourpath/ganache-2.7.1-linux-x86_64.AppImage

    ▴ 接下来双击该文件即可。

  # 6.React应用
    (这里我已经有目录了，所以你使用 npx create-react-app my-app 自己创建一个这里名为my-app的目录并有一些配置文件，然后照着我的前端目录自己去添加修改）
    ▴ 切换到你的前端目录中
    cd /yourpath

    ▴ 安装react-router-dom
    npm install react-router-dom

# 启动
  # 1.先启动你的Ganache，然后在你的add project中加入你项目的truffle-config.js配置文件
  # 2.在你的前端目录使用
    npm start


    
    







