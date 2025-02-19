from cryptography.fernet import Fernet


def main():
    """
    Generate a Fernet key and print it to the console.
    """
    key = Fernet.generate_key()
    print(key.decode())


if __name__ == "__main__":
    main()
