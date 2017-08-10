---
layout: post
title: "Run Spark with IPython Notebook on Local Windows System"
category: Technology
tags: [BigData,Spark,Python]
description: "<p>This article is an instruction for user to setup local Spark learning and debug environment.</p>"
---

The tools need to be installed:

- JDK 1.7+
- Anaconda (Python environment)
- Spark (with Hadoop libraries)

[comment]: <> (All the tools can be found in OneDrive folder in this [link](https://merkleinc-my.sharepoint.com/personal/yuxu_merkleinc_com/_layouts/15/guestaccess.aspx?guestaccesstoken=om31nVRkO1ydH70mox0EoI04Z5i%2bfYIdi1aG24hBs08%3d&folderid=2_035e595fab95045d9a45141ff53283110&rev=1).)

### 1. Make sure you have JDK 1.7+ installed on your machine

You can check this by opening a command line window. Type `java -version` and see if the expected Java version is returned.

[comment]: <> (If JDK is not installed and you do not have administrator privilege, you may download it from above OneDrive folder and unzip it to your local drive.)

### 2. Download and install Anaconda

Anaconda is an integrated Python platform which has lots of pre-installed packages and tools, including the famous web interactive IPython Notebook (aka Jupyter Notebook).
The download page is [https://www.continuum.io/downloads](https://www.continuum.io/downloads).

### 3. Download and install Spark

Get latest Spark version which is pre-built for Apache Hadoop, then unzip to your local drive.

The Spark releases do not actually include Hadoop as the names may imply. They simply include libraries to integrate with the Hadoop clusters and distributions listed. Many of the Hadoop classes are required regardless of whether you are using Hadoop.

> **Caution:** You may be tempted to download the “without Hadoop” or spark-x.x.x-bin-without-hadoop.tgz options if you are installing in Standalone mode and not using Hadoop. However this name can be confusing, as the build is expecting many of the required classes that are implemented in Hadoop to be present on the system. Select this option only if you have Hadoop installed on the system already. Otherwise, use one of the spark-x.x.x-bin-hadoopx.x builds.

The download page is [http://spark.apache.org/downloads.html](http://spark.apache.org/downloads.html).

### 4. Copy Hadoop winutils.exe to Spark's \bin folder

As we mentioned Spark does not necessarily need Hadoop installed on the machine, but it depends on many of the Hadoop libraries. To make it run properly on Windows, Hadoop requires native libraries on Windows. For example, Hadoop uses some Windows API to implement posix-like file access permissions such as accessing the file:// file system.

To enable this, we need to copy the winutils.exe file into Spark's \bin folder. The file can be downloaded from [GitHub](https://github.com/steveloughran/winutils/raw/master/hadoop-2.7.1/bin/winutils.exe).

### 5. Update system environment variables

Update system environment variables in "Advanced system settings" --> "Environment Variables...". The file path might be different based on your install location:

- JAVA_HOME: `C:\Java\jdk1.8.0_121`
- JRE_HOME: `C:\Java\jdk1.8.0_121\jre`
- CLASSPATH: `C:\Java\jdk1.8.0_121\jre\lib`
- SPARK_HOME: `C:\Spark\spark-2.2.0-bin-hadoop2.7`
- HADOOP_HOME: `C:\Spark\spark-2.2.0-bin-hadoop2.7`

Append following string to your "Path" variable:

- `;C:\Java\jdk1.8.0_121\bin;C:\Spark\spark-2.2.0-bin-hadoop2.7\bin;C:\Anaconda2;C:\Anaconda2\Scripts`

### 6. Launch PySpark shell and test

`pyspark --master local[2]`

The --master is used for setting the master node address. Here we launch Spark locally on 2 cores for local testing.

Now you should be able to type and execute Python commands in Spark environment.

### 7. Set system environment variables for IPython Notebook

While PySpark shell is one way to test your commands, it might be difficult to edit and maintain the code. IPython Notebook (aka Jupyter Notebook) is an interactive computational environment which can combine code edit, execution, rich text, mathematics, plots and rich media.
To enable it, user needs to add the following system environment variables:

- PYSPARK_DRIVER_PYTHON: `jupyter`
- PYSPARK_DRIVER_PYTHON_OPTS: `notebook`

### 8. Launch PySpark shell in IPython Notebook and test

Close previous command line window, and open a new one to execute:

`pyspark --master local[2]`

The command should be able to auto open default browser and redirect to the local Notebook web, and user can start to create a new notebook and execute the code.

### End

>Originally post at [blog.xuyuan.me](http://blog.xuyuan.me/2017/08/09/spark-ipython.html)
