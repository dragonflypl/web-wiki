## Image

Image is R/O and it is used to spin up a container. So container is a run-time thing, whereas Image is build time thing.

Images are readonly, so container adds a R/W layer on top of the image.

Images are stored in registry. To pull an image type `docker image pull nameoftheimage`

By default , images are pulled from Docker Hub (<https://hub.docker.com>)

Manifest file describes an image (in reality, image is not a single file - it is an set of **layers** and manifest describes them all)

## Container

Container is virtual OS - a slice of OS (similar to virtual machine on physical machine)

Container is a running instance of image.

## Dockerfile

Docker file specifies how and application can be "containerized" i.e. how to create an image that will host the application, and this image could be later used to create an container.

Dockerfile is a text file with a bunch of instruction on how to create an image.

Building happens with `docker image build`

### Multistage builds

Multistage builds enable creation of images that contain only production code (no build time stuff).

Dockerfile contains multiple `FROM` sections, each responsible for a part of build process and only last one created production image with small production only content.

## Swarns

Something like a cluster of docker nodes / containers

## Networking

Containers / docker nodes can work in different types of networks like bridge / overnet . Each enables container communication with different features.

## Volumes

Need to persist some data? Containers come and go and are not designed for persistent storage.

Volumes are detached from containers, however they can be mounted to containers.

## Stack

Stack is a complete specification of an application (frontend, backend, etc...).

Stack contains information about services.

It is a complete description of an application / system (networks, volumes, services, replicas etc.)

## Resources

- <https://github.com/nigelpoulton/atsea-sample-shop-app> : sample app with multistage docker build