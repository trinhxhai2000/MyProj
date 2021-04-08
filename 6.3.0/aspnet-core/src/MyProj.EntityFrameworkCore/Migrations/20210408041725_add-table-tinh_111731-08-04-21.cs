using Microsoft.EntityFrameworkCore.Migrations;

namespace MyProj.Migrations
{
    public partial class addtabletinh_111731080421 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Tinh");

            migrationBuilder.DropColumn(
                name: "MyProperty2",
                table: "Tinh");

            migrationBuilder.AddColumn<bool>(
                name: "TTTU",
                table: "Tinh",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Tinh",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TTTU",
                table: "Tinh");

            migrationBuilder.DropColumn(
                name: "name",
                table: "Tinh");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Tinh",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MyProperty2",
                table: "Tinh",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
