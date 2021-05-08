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

checkIfValidCommand() {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

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

executeAddCommand() {
  read -p "Please, enter username: " username
  validateInput $username
  read -p "Please, enter role: " role
  validateInput $role

  echo "$username , $role" >> $FILE
}

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

executeBackup() {
  local backupFile="$FILE_PATH/$(date +"%Y%m%d%H%M%S")-users.db.backup"
  cp $FILE $backupFile
}

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

executeList() {
  local N=1
  while IFS= read -r line; do
    echo "$N. $line"
    N=$((N+1))
  done < $FILE
}

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
