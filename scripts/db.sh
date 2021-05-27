# path to file
declare FILE_PATH=./../data
declare FILE=./../data/users.db
# possible commands
declare -a commands=("add" "backup" "restore" "find" "list" "help")
declare command=$1

# checks if $FILE exists
# if not then ask to create it
# returns true if file exists or was created
# returns false if file does not exist and user declined to craete it
checkIfFileExists() {
  echo "Checking if $FILE exists..."
  if [ -f "$FILE" ]; then
    echo "$FILE exists."
    return 0
  else
    echo "$FILE does not exist."
    read -r -p "Create a new db file? [y/N] " response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
      then
        touch $FILE
        echo "Created a new $FILE"
        return 0
      else
        echo "Finishing."
        exit
    fi
  fi
}

# cheks if user entered valid command
checkIfValidCommand() {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

# read users command and validate it
readCommandAndValidate() {
  checkIfValidCommand $1 "${commands[@]}"
  if [[ $? -eq 0 ]]
    then
      return 0
    else
      echo "Command $command is unknown. Please, use help."
      echo "Exiting."
      exit
  fi
}

# validate passed argument to be alphabetic
validateInput() {
  input=$1
  if [[ "${input}" =~ [^a-zA-Z] ]]
    then
      echo "$input should contain latin letters only."
      echo "Exiting."
      exit
    else
      return 0
  fi
}

# adds new row to the users.db
executeAddCommand() {
  read -p "Please, enter username: " username
  validateInput $username
  read -p "Please, enter role: " role
  validateInput $role

  echo "$username , $role" >> $FILE
}

# prints help
executeHelp() {
  echo "
  usage: db.sh [command]

  where command can be:
        add           Adds a new line to the users.db
        backup        Creates a new file, named %date%-users.db.backup which is a copy of current users.db
        restore       Takes last created backup file and replaces users.db with it
        find          Prompts user to type a username, then prints username and role if such exists in users.db
        list          Prints contents of users.db in format: N. username, role
  "
}

# creates new backup file
executeBackup() {
  local backupFile="$FILE_PATH/$(date +"%Y%m%d%H%M%S")-users.db.backup"
  cp $FILE $backupFile
}

# restore latests backup
executeRestore() {
  local lastBackupFileDate
  local lastBackupFilePath
  for currentfile in $FILE_PATH/*.backup ; do
      fileDate=${currentfile:10:14}
      if [[ fileDate -gt lastBackupFileDate ]]
        then
          lastBackupFileDate=$fileDate
          lastBackupFilePath=$currentfile
      fi
  done

  if [ -z "$lastBackupFilePath" ]
    then
      echo "No backup file found";
      exit
  fi

  cp $lastBackupFilePath $FILE
}

# prints all requested users
executeFind() {
  read -p "Please, enter username: " username
  validateInput $username
  read -p "Please, enter role: " role
  validateInput $role

  local rowToFind="$username , $role"
  local rowExists=1

  while IFS= read -r line; do
    if [[ $line == $rowToFind ]]
      then
        rowExists=0
        echo $line
    fi
  done < $FILE

  if [[ $rowExists -eq 0 ]]
    then
      :
    else
      echo "User not found"
  fi
}

# prints all rows from users.db with index
executeList() {
  local N=1
  while IFS= read -r line; do
    echo "$N. $line"
    N=$((N+1))
  done < $FILE
}

# executes command passed as function argument
executeCommand() {
  case $1 in
    add)
      checkIfFileExists
      executeAddCommand
      ;;
    help)
      executeHelp
      ;;
    backup)
      executeBackup
      ;;
    restore)
      executeRestore
      ;;
    find)
      executeFind
      ;;
    list)
      executeList
      ;;
  esac
}

readCommandAndValidate $command
executeCommand $command
